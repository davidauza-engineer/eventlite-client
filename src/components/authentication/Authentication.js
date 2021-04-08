import React from 'react';

import AuthenticationFormErrors from './AuthenticationFormErrors';
import Login from './Login';
import SignUp from './SignUp';

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: {
        loginForm: {},
        signUpForm: {}
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
    if (!email_regexp.test(String(email).toLowerCase())) {
      const newState = { formErrors: { ...this.state.formErrors, [form]: { ...this.state.formErrors[form], email: ['not in the proper format'] } } };
      this.setState(newState);
    } else {
      const newState = { formErrors: { ...this.state.formErrors, [form]: { ...this.state.formErrors[form] } } };
      delete newState.formErrors[form]['email'];
      this.setState(newState);
    }
  }

  validatePassword = (password, form) => {
    if (password.length < 8) {
      const newState = { formErrors: { ...this.state.formErrors, [form]: { ...this.state.formErrors[form], password: ['must contain at least 8 characters'] } } };
      this.setState(newState);
    } else {
      const newState = { formErrors: { ...this.state.formErrors, [form]: { ...this.state.formErrors[form] } } };
      delete newState.formErrors[form]['password'];
      this.setState(newState);
    }
  }

  render() {
    return (
      <div>
        <Login fieldValidation={this.validateField} />
        <AuthenticationFormErrors formErrors={this.state.formErrors.loginForm} />
        <SignUp fieldValidation={this.validateField} />
        <AuthenticationFormErrors formErrors={this.state.formErrors.signUpForm} />
      </div>
    )
  }
}

export default Authentication;