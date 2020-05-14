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
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '1000px',
    height: 'auto',
    top: '20px',
    left: '0px',
    opacity: '80%',
    zIndex: '-1',
  };

  const footerStyle = {
    fontSize: '12px',
    position: 'fixed',
    left: '0',
    bottom: '-8px',
    width: '100%',
    textAlign: 'left',
    paddingLeft: `32px`,
  };

  return (
    <div className='padding'>
      <div style={sectionStyle}></div>
      <div className="row">
        <div className="col-5"></div>
        <div className="col-7">
          <h5 className="text-center">RockOn is your digital climbing logbook.
          Record your ascents and attempts and visualize your climbing history.
          Sign up or log in to get started.</h5>
          <br />
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
      <div style={footerStyle}>
        <p className="font-italic">Alpenglow in the Range of Light...    Art by
          <a href='https://gutzjourney.com/' target="_blank" rel="noopener noreferrer"> Natalie Brechtel</a>
        </p>
      </div>
    </div>
  )
}