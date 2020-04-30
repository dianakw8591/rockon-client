import React from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';


export default function Landing(props) {
  const { signupForm, onLogin } = props;

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-4">
        <h4>RockOn is your digital climbing logbook. 
          Record your ascents and attempts and visualize your climbing history. 
          Sign up or log in to get started.</h4>
      </div>
      <div className="col-2"></div>
      <div className="col-4">
        {signupForm ?
          <Signup onSignin={onLogin} /> :
          <Login onLogin={onLogin} />
        }
      </div>
    </div>      
  )
}