import AppHeader from './components/AppHeader';
import Login from './components/Login';
import Eventlite from './components/Eventlite';

const currentUser = function() {
  const user = localStorage.getItem('user');
  console.log(user);
  return user;
};

function App() {
  return (
    <div className="App">
      <AppHeader />
      {currentUser() ? <Eventlite /> : <Login />}
    </div>
  );
}

export default App;
