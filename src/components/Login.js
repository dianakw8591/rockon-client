import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { api } from '../services/api';
import '../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      validated: false,
      fields: {
        username: '',
        password: '',
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
      event.preventDefault()
      const user = {
        user: this.state.fields 
      }
      api.auth.login(user).then(resp => {
        if (!resp.error) {
          this.props.onLogin(resp);
          this.props.history.push('/dashboard');
        } else {
          this.setState({
            error: resp.error,
            validated: false,
            fields: {
              username: '',
              password: '',
            }
          });
        }
      });
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Form.Label>Log in to your account:</Form.Label>
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
            {this.state.error ? <Form.Text> {this.state.error} </Form.Text> : null}
            <Button variant="secondary" type="submit" block>
              Log in
          </Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default withRouter(Login)