import React from 'react';
import axios from 'axios';

class Login extends React.Component {

  handleLogin = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:3001/auth/sign_in',
      data: {
        email: this.email.value,
        password: this.password.value
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
    });
  }

  render() {
    return (
      <div>
        <h2>Log in</h2>
        <form id="loginForm" onSubmit={this.handleLogin}>
          <input name="email" ref={(input) => this.email = input} onChange={this.props.fieldValidation} />
          <input name="password" type="password" ref={(input) => this.password = input} onChange={this.props.fieldValidation} />
          <input type="submit" value="Log in" disabled={!this.props.valid} />
        </form>
      </div>  
    )
  }
}

export default Login;
