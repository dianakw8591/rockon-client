import React, { Component } from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { api } from '../services/api';
import '../App.css';

class EditUserForm extends Component {

  state = {
    error: false,
    validated: false,
    fields: this.props.authUser,
  };


  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      event.preventDefault();
      const user = { user: this.state.fields };
      api.user.updateUser(user).then(resp => {
        if (!resp.error) {
          this.props.onUpdateUser(resp);
          this.props.hideForm();
        } else {
          this.setState({
            error: resp.error,
            validated: false,
            fields: this.props.authUser,
          })
        }
      });
    }
  };

  render() {
    return (
      <div>
        <Card>
          <Card.Header>
            <strong>Update your account:</strong>
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm="3">Username:</Form.Label>
                <Col sm="9">
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    onChange={event => this.handleChange(event)}
                    value={this.state.fields.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    You must enter a username.
            </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">First Name:</Form.Label>
                <Col sm="9">
                  <Form.Control
                    required
                    type="text"
                    name="first_name"
                    onChange={event => this.handleChange(event)}
                    value={this.state.fields.first_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    You must enter a first name.
            </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">Last Name:</Form.Label>
                <Col sm="9">
                  <Form.Control
                    required
                    type="text"
                    name="last_name"
                    onChange={event => this.handleChange(event)}
                    value={this.state.fields.last_name}
                  />
                  <Form.Control.Feedback type="invalid">
                    You must enter a last name.
            </Form.Control.Feedback>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="3">Email:</Form.Label>
                <Col sm="9">
                  <Form.Control
                    required
                    type="text"
                    name="email"
                    onChange={event => this.handleChange(event)}
                    value={this.state.fields.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    You must enter an email.
            </Form.Control.Feedback>
                </Col>
              </Form.Group>
              {this.state.error ? <Form.Text> {this.state.error} </Form.Text> : null}
              <Form.Group as={Row} className="justify-content-center">
                <Button variant="info" type="submit" >
                  Update Profile
              </Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default EditUserForm