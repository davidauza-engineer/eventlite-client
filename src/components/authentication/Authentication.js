import React from 'react';

import AuthenticationForm from './AuthenticationForm';

const Authentication = (props) => (
  <div>
    <AuthenticationForm formName="Log In"
                        endpoint='http://localhost:3001/auth/sign_in'/>
    <AuthenticationForm formName="Sign Up"
                        endpoint='http://localhost:3001/auth'/>
  </div>
)

export default Authentication;
