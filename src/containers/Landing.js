import React from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';
import background from '../assets/background.png';


export default function Landing(props) {
  const { signupForm, onLogin } = props;

  const sectionStyle = {
    position: 'fixed',
    backgroundImage: `url(${background})`,
    minHeight: '1000px',
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    width: '1300px',
    height: 'auto',
    top: '0px',
    backgroundRepeat: 'no-repeat',
    opacity: '75%'
  };

  return (
    <div className='padding'>
      <div style={sectionStyle}></div>
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <h4>RockOn is your digital climbing logbook.
          Record your ascents and attempts and visualize your climbing history.
          Sign up or log in to get started.</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-8"></div>
        <div className="col-4">

          {signupForm ?
            <Signup onSignin={onLogin} /> :
            <Login onLogin={onLogin} />
          }
        </div>
      </div>
    </div>
  )
}