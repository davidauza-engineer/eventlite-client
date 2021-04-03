import React from 'react';
import axios from 'axios';

function AppHeader() {
  return(
    <div>
      <div style={ { float: 'right' } }>
        <a href="#">Sign out</a>
      </div>
      <h1 className="logo">Eventlite</h1>
    </div>  
  )
}

export default AppHeader;
