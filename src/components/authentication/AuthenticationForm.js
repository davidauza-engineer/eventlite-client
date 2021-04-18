import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class AuthenticationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {
        email:  [],
        password: []
      },
      validity: false,
      submitPerformed: false,
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitPerformed: true })
    axios({
      method: 'POST',
      url: this.props.endpoint,
      data: {
        email: this.email.value,
        password: this.password.value
      }
    })
    .then(response => this.loginUser(response))
    .catch(error => {
      const formName = this.props.formName;
      let newState = {};
      if (formName === 'Log In') {
        newState = { formErrors: error.response.data };
      } else {
        newState = { formErrors: error.response.data.errors };
      }
      this.setState(newState);
    });
  }

  loginUser = (response) => {
    localStorage.setItem('user',
      JSON.stringify(
        {
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.data.data.uid
        }
      )
    );
    window.location = '/';
  }

  validateField = (event) => {
    event.preventDefault();
    if (this.state.submitPerformed) {
      this.state.formErrors = {};
      this.setState({ submitPerformed: false });
    }
    const value = event.target.value;
    switch(event.target.name) {
      case 'email':
        this.validateEmail(value);
        break;
      default:
        this.validatePassword(value);
        break;
    }
  }

  validateEmail = (email) => {
    const email_regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let newState = { formErrors: { ...this.state.formErrors } };
    if (!email_regexp.test(String(email).toLowerCase())) {
      newState = { formErrors: { ...this.state.formErrors, email: ['not in the proper format'] } };
    } else {
      delete newState.formErrors['email'];
    }
    this.setState(newState, () => this.validateForm());
  }

  validatePassword = (password) => {
    let newState = { formErrors: { ...this.state.formErrors } };
    if (password.length < 8) {
      newState = { formErrors: { ...this.state.formErrors, password: ['must contain at least 8 characters'] } };
    } else {
      delete newState.formErrors['password'];
    }
    this.setState(newState, () => this.validateForm());
  }

  validateForm = () => {
    const newState = { validity: Object.keys(this.state.formErrors).length === 0 }
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <h2>{this.props.formName}</h2>
        <form onSubmit={this.handleSubmit}>
          <input name="email" ref={(input) => this.email = input} onChange={this.validateField} />
          <input name="password" type="password" ref={(input) => this.password = input} onChange={this.validateField} />
          <input type="submit" value={this.props.formName} disabled={!this.state.validity} />
        </form>
        <div>
          {Object.keys(this.state.formErrors).filter((key) => {
            if (key === 'full_messages' || key === 'success') {
              return false;
            }
            return true;
          })
          .map(formErrorField => {
            return (
              this.state.formErrors[formErrorField].map(error => {
                return (
                  <p>{formErrorField} {error}</p>
                )
              })
            )
          })}
        </div>
      </div>  
    )
  }
}

AuthenticationForm.propTypes = {
  formName: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
}

export default AuthenticationForm;
