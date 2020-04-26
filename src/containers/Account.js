import React from 'react';
import AuthHOC from '../HOCs/authHOC'


function Account(props) {  

  return (
    <div>
      <h1>Account</h1>
    </div>      
  )
}

export default AuthHOC(Account)
