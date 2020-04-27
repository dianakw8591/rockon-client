import React, { useState } from 'react';
import AuthHOC from '../HOCs/authHOC';
import { api } from '../services/api';
import EditUserForm from '../components/EditUserForm';
import Button from 'react-bootstrap/Button';


function Account(props) {
  const { username, first_name, last_name, email, id } = props.authUser;
  const { authUser, onUpdateUser, handleLogout, history } = props;
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDeleteAccount = () => {
    const result = window.confirm("Are you sure you want to delete your account? All your climbing records will be deleted.");
    if (result) {
      api.user.deleteUser(id).then(resp => {
        if (!resp.error) {
          handleLogout();
          history.push('/');
        }
      })
    }
  }

  return (
    <div id='sideBar' className="container-fluid row">
      <div className='left-side-menu col-2 text-center'></div>

      <main id="mainbar" className="col-7">
        <div className="white-trans-bg">
          {showEditForm ?
            <EditUserForm authUser={authUser} onUpdateUser={onUpdateUser} hideForm={()=>setShowEditForm(false)} />
            : <div>
              <h5>Your Profile: </h5>
              Username: {username}<br />
              Name: {first_name} {last_name} <br />
              Email: {email}<br />
              </div>
          }

          <div> 
          <Button variant="outline-secondary" onClick={() => setShowEditForm(true)}>
          Edit your profile
        </Button><br />
        <Button variant="outline-secondary" onClick={handleDeleteAccount}>
          Delete Your Account
        </Button>
            
          </div>
        </div>

      </main>

    </div>
  )
}

export default AuthHOC(Account)

// 
// {/* <EditUserForm authUser={authUser} onUpdateUser={onUpdateUser} /> */}
// 