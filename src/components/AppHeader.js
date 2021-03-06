import React from 'react';
import axios from 'axios';

const handleSignOut = function(event) {
  event.preventDefault();
  axios({
    method: 'DELETE',
    url: 'http://localhost:3001/auth/sign_out',
    data: JSON.parse(localStorage.user)
  })
  .then(()=> {
    localStorage.removeItem('user');
    window.location = '/';
  });
}

function AppHeader(props) {
  const currentUser = localStorage.getItem('user');
  return(
    <div>
      {currentUser &&
        <div style={ { float: 'right' } }>
          {JSON.parse(currentUser).uid}
          <a href="#" onClick={handleSignOut}>Sign out</a>
        </div>
      }
      <h1 className="logo" style={ { color: props.logoColor } }>Eventlite</h1>
    </div>  
  )
}

export default AppHeader;
