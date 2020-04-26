import React from 'react';
import AuthHOC from '../HOCs/authHOC'


function Logbook(props) {

  return (
    <div>
      <h1>Logbook</h1>
    </div>      
  )
}

export default AuthHOC(Logbook)