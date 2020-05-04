import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { api } from '../services/api';
import '../App.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      validated: false,
      fields: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    };
  }


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
      if (this.state.fields.password !== this.state.fields.password_confirmation) {
        this.setState(prev => {
          return ({
            error: "Password and password confirmation do not match.",
            validated: false,
            fields: {
              ...prev.fields, password: '', password_confirmation: '',
            }
          })
        })
      } else {
        const user = { user: this.state.fields };
        api.user.newUser(user).then(resp => {
          if (!resp.error) {
            this.props.onSignin(resp);
            this.props.history.push('/dashboard/stats');
          } else {
            this.setState({
              error: resp.error,
              validated: false,
              fields: {
                username: '',
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: '',
              }
            })
          }
        });
      }
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Form.Label>Create an account:</Form.Label>
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
                  placeholder="Username"
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
                  placeholder="First name"
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
                  placeholder="Last name"
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
                  placeholder="Enter email"
                  onChange={event => this.handleChange(event)}
                  value={this.state.fields.email}
                />
                <Form.Control.Feedback type="invalid">
                  You must enter an email.
            </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">Password:</Form.Label>
              <Col sm="9">
                <Form.Control
                  required
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={event => this.handleChange(event)}
                  value={this.state.fields.password}
                />
                <Form.Control.Feedback type="invalid">
                  You must enter a password.
            </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">Confirm Password:</Form.Label>
              <Col sm="9">
                <Form.Control
                  required
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm password"
                  onChange={event => this.handleChange(event)}
                  value={this.state.fields.password_confirmation}
                />
                <Form.Control.Feedback type="invalid">
                  You must confirm your password.
            </Form.Control.Feedback>
              </Col>
            </Form.Group>
            {this.state.error ? <Form.Text> {this.state.error} </Form.Text> : null}
            <Form.Group as={Row} className="justify-content-center">
              <Button variant="secondary" type="submit" >
                Create account
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    )
  }
}

export default withRouter(Signup)