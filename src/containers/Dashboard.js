import React from 'react';
import AuthHOC from '../HOCs/authHOC';
import { Link, Route} from "react-router-dom";
import Logbook from './Log';


function Dashboard(props) {

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to='/dashboard/log'>Logbook</Link>
      <Route exact path={`/dashboard/log`} component={Logbook}/>

    </div>
      
  )
}

export default AuthHOC(Dashboard)
