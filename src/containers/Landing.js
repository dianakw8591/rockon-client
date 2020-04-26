import React from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';


export default function Landing(props) {
  const { signupForm, onLogin } = props;

  return (
    <div className="row">
      <div className="col-7"></div>
      <div className="col-4">
        {signupForm ?
          <Signup onSignin={onLogin} /> :
          <Login onLogin={onLogin} />
        }
      </div>
    </div>      
  )
}