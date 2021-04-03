import React from 'react';
import axios from 'axios';

function AppHeader(props) {
  return(
    <div>
      <div style={ { float: 'right' } }>
        <a href="#">Sign out</a>
      </div>
      <h1 className="logo" style={ { color: props.logoColor } }>Eventlite</h1>
    </div>  
  )
}

export default AppHeader;
