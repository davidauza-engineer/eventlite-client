import React from 'react';
import AppHeader from './components/AppHeader';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Eventlite from './components/Eventlite';

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
    <div className="App">
      <AppHeader logoColor={this.state.logoColor} />
      {this.currentUser() ? 
        <Eventlite changeLogoColour={this.changeLogoColour}/> : 
        <><Login /><SignUp /></> }
    </div>
  );
  }
}

export default App;
