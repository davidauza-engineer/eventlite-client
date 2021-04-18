import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class SignUp extends React.Component {
  handleSignUp = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:3001/auth',
      data: { email: this.email.value, password: this.password.value }
    })
    .then(response => {
      localStorage.setItem('user', JSON.stringify({
        'access-token': response.headers['access-token'],
        'client': response.headers['client'],
        'uid': response.data.data.uid
      }));
      window.location = '/';
    })
  }

  render() {
    return(
      <div>
        <h2>Sign Up</h2>
        <form id='signUpForm' onSubmit={this.handleSignUp} >
          <input name="email" ref={(input) => this.email = input } onChange={this.props.fieldValidation} />
          <input name="password" type="password"
                 ref={(input) => this.password = input }
                 onChange={this.props.fieldValidation} />
          <input type="submit" value="Sign up" disabled={!this.props.valid} />
        </form>
      </div>  
    )
  }
}

SignUp.propType = {
  fieldValidation: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired
}

export default SignUp;
