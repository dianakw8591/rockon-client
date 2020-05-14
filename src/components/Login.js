import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Container, Button, Form, Card } from 'react-bootstrap';
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
          this.props.history.push('/dashboard/stats');
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
          <Card>
            <Card.Body>
              <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Log in to your account:</Form.Label>
                </Form.Group>
                <Form.Group >
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
                </Form.Group>
                <Form.Group >
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
                </Form.Group>
                {this.state.error ? <Form.Text> {this.state.error} </Form.Text> : null}
                <Form.Group className="d-flex justify-content-center">
                  <Button variant="secondary" type="submit" >
                    Log in
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}

export default withRouter(Login)