import React, { Component } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
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
        <Container>
          <Form.Label>Update your account:</Form.Label>
          <br />
          <br />
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
            <Form.Group as={Row}>
              <Button variant="secondary" type="submit" block>
                Update Profile
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    )
  }
}

export default EditUserForm