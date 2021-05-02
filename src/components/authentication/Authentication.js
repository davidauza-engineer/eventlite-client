import React from 'react';

import AuthenticationForm from './AuthenticationForm';
import PasswordResetEmail from './password_reset/PasswordResetEmail';

import './Authentication.css';

const Authentication = (props) => (
  <div>
    <AuthenticationForm formName="Log In"
                        endpoint='http://localhost:3001/auth/sign_in'/>
    <AuthenticationForm formName="Sign Up"
                        endpoint='http://localhost:3001/auth'/>
    <PasswordResetEmail />
  </div>
)

export default Authentication;
