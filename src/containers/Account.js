import React, { useState } from 'react';
import AuthHOC from '../HOCs/authHOC';
import { api } from '../services/api';
import EditUserForm from '../components/EditUserForm';
import { Button, Container, Col, Row, Card } from 'react-bootstrap';


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
    <div className='padding'>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <strong>Your Profile: </strong>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  Username: {username}
                </Card.Text>
                <Card.Text>
                  Name: {first_name} {last_name}
                </Card.Text>
                <Card.Text>
                  Email: {email}
                </Card.Text>
            <Row>
              <Col>
                <Button variant="outline-info" onClick={() => setShowEditForm(true)}>
                  Edit your profile
                </Button>
              </Col>
              <Col>
                <Button variant="outline-danger" onClick={handleDeleteAccount}>
                  Delete Your Account
                </Button>
              </Col>
            </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {showEditForm ?
              <EditUserForm authUser={authUser} onUpdateUser={onUpdateUser} hideForm={() => setShowEditForm(false)} />
              : null
            }
          </Col>

        </Row>
      </Container>
    </div>
  )
}

export default AuthHOC(Account)

// 
// {/* <EditUserForm authUser={authUser} onUpdateUser={onUpdateUser} /> */}
// 