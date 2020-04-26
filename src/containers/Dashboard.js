import React from 'react';
import AuthHOC from '../HOCs/authHOC'


function Dashboard(props) {

  return (
    <div>
      <h1>Dashboard</h1>
    </div>      
  )
}

export default AuthHOC(Dashboard)
