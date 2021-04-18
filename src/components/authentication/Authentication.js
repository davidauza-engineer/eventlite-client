import React from 'react';
import axios from 'axios';

import AuthenticationFormErrors from './AuthenticationFormErrors';
import AuthenticationForm from './AuthenticationForm';

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {
        loginForm: {
          email: [],
          password: []
        },
        signUpForm: {
          email: [],
          password: []
        }
      },
      formValidity: {
        loginForm: false,
        signUpForm: false
      }
    }
  }

  validateField = (event) => {
    event.preventDefault();
    const formName = event.target.parentElement.id;
    const value = event.target.value;
    switch(event.target.name) {
      case 'email':
        this.validateEmail(value, formName);
        break;
      case 'password':
        this.validatePassword(value, formName);
        break;
    }
  }

  validateEmail = (email, form) => {
    const email_regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let newState = {};
    if (!email_regexp.test(String(email).toLowerCase())) {
      newState = { formErrors: { ...this.state.formErrors, [form]: { ...this.state.formErrors[form], email: ['not in the proper format'] } } };
    } else {
      newState = { formErrors: { ...this.state.formErrors, [form]: { ...this.state.formErrors[form] } } };
      delete newState.formErrors[form]['email'];
    }
    this.setState(newState, () => this.validateForm(form));
  }

  validatePassword = (password, form) => {
    let newState = {};
    if (password.length < 8) {
      newState = { formErrors: { ...this.state.formErrors, [form]: { ...this.state.formErrors[form], password: ['must contain at least 8 characters'] } } };
    } else {
      newState = { formErrors: { ...this.state.formErrors, [form]: { ...this.state.formErrors[form] } } };
      delete newState.formErrors[form]['password'];
    }
    this.setState(newState, () => this.validateForm(form));
  }

  validateForm = (form) => {
    const newState = { formValidity: { ...this.state.formValidity, [form]: Object.keys(this.state.formErrors[form]).length === 0 } }
    this.setState(newState);
  }

  handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const form = event.target.id;
    axios({
      method: 'POST',
      url: 'http://localhost:3001/auth/sign_in',
      data: {
        email: email,
        password: password
      }
    })
    .then(response => {
      console.log(response);
      localStorage.setItem('user', 
        JSON.stringify({
          'access-token': response.headers['access-token'],
          'client': response.headers['client'],
          'uid': response.data.data.uid
        })
      )
      window.location = '/';
    })
    .catch(error => {
      const newState = { formErrors: { ...this.state.formErrors, [form]: error.response.data } };
      this.setState(newState);
    });
  }

  handleSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const form = event.target.id;
    axios({
      method: 'POST',
      url: 'http://localhost:3001/auth',
      data: { email: email, password: password }
    })
    .then(response => {
      localStorage.setItem('user', JSON.stringify({
        'access-token': response.headers['access-token'],
        'client': response.headers['client'],
        'uid': response.data.data.uid
      }));
      window.location = '/';
    })
    .catch(error => {
      const newState = { formErrors: { ...this.state.formErrors, [form]: error.response.data.errors } };
      this.setState(newState);
    });
  }

  render() {
    return (
      <div>
        <AuthenticationForm formName="Log In"
                            id="loginForm"
                            submit={this.handleLogin}
                            fieldValidation={this.validateField} 
                            valid={this.state.formValidity.loginForm} />
        <AuthenticationFormErrors formErrors={this.state.formErrors.loginForm} />
        <AuthenticationForm formName="Sign Up"
                            id="signUpForm"
                            submit={this.handleSignUp} 
                            fieldValidation={this.validateField} 
                            valid={this.state.formValidity.signUpForm} />
        <AuthenticationFormErrors formErrors={this.state.formErrors.signUpForm} />
      </div>
    )
  }
}

export default Authentication;
