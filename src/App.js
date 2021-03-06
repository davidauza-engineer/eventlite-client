import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Authentication from './components/authentication/Authentication';
import Eventlite from './components/Eventlite';
import PasswordResetPasswords from './components/authentication/password_reset/PasswordResetPasswords';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoColor: 'black'
    }
  }

  currentUser = () => {
    const user = localStorage.getItem('user');
    console.log(user);
    return user;
  };

  changeLogoColour = () => {
    const colors = ['red', 'blue', 'green', 'violet'];
    this.setState({ ...this.state, logoColor: colors[Math.floor(Math.random() * colors.length)] });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AppHeader logoColor={this.state.logoColor} />
          <Route path='/' exact render={(props) => (
            <>
              {this.currentUser() ? 
                <Eventlite changeLogoColour={this.changeLogoColour}/> : 
                <Authentication />
              }
            </>
          )}
          />
          <Route path='/password_reset' component={PasswordResetPasswords} />
        </div>
      </Router>
    );
  }
}

export default App;
