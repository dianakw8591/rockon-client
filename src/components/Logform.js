import React, { Component } from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { api } from '../services/api';
import '../App.css';

class Logform extends Component {
  state = {
    error: false,
    fields: {
      pitches: this.props.climb.pitches || 1,
      start_date: new Date(),
      style: '',
      led_pitches: '',
      outcome: '',
      partners: '',
      rack: '',
      notes: '',
    }
  };


  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleDateChange = date => {
    const newFields = { ...this.state.fields, start_date: date };
    this.setState({ fields: newFields })
  }

  handleSubmit = event => {
    event.preventDefault();
    const entry = { entry: { ...this.state.fields, climb_id: this.props.climb.id } };
    api.entry.addEntry(entry, this.props.id).then(resp => {
      if (!resp.error) {
        this.props.onAddEntry(resp);
        this.setState({ error: false })
      } else {
        this.setState({
          error: resp.error,
        })
      }
      this.setState({
        fields: {
          ...this.state.fields,
          style: '',
          led_pitches: '',
          outcome: '',
          partners: '',
          rack: '',
          beta: '',
          notes: '',
        }
      })
    });
  };

  area = () => {
    return this.props.climb.area_array.join('>')
  }

  createOptions = (array) => {
    return array.map(e => <option value={e} key={e}>{e}</option>)
  }

  outcomes = ['Onsight', 'Flash', 'Tronsight', 'Pinkpoint', 'Redpoint', 'No Falls', 'Repeat', 'Attempt'];
  styles = ['Lead', 'Swap Leads', 'Follow', 'Toprope', 'Solo'];

  render() {
    const { name, full_type, rating, pitches } = this.props.climb;

    return (
      <div>
        <Container>
          <div>
            <h6>{name}</h6>
            {this.area()}<br />
            {full_type + ' ' + rating + ' pitches: ' + pitches}
          </div><br />
          <Form.Label>Log your climb:</Form.Label>
          <br />
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">Date:</Form.Label>
              <Col sm="9">
                <DatePicker
                  name='start_date'
                  onChange={this.handleDateChange}
                  value={this.state.fields.start_date}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}></Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">Pitches:</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="number"
                  name="pitches"
                  onChange={event => this.handleChange(event)}
                  value={this.state.fields.pitches}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">Style:</Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  name="style"
                  value={this.state.fields.style}
                  onChange={event => this.handleChange(event)}>
                  <option>Select a style</option>
                  {this.createOptions(this.styles)}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">Outcome:</Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  name='outcome'
                  value={this.state.fields.outcome}
                  onChange={event => this.handleChange(event)}>
                  <option>Select an outcome</option>
                  {this.createOptions(this.outcomes)}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">Partners:</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="partners"
                  onChange={event => this.handleChange(event)}
                  value={this.state.fields.partners}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">Rack:</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="rack"
                  onChange={event => this.handleChange(event)}
                  value={this.state.fields.rack}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">Beta:</Form.Label>
              <Col sm="9">
                <Form.Control
                  as='textarea'
                  name="beta"
                  onChange={event => this.handleChange(event)}
                  value={this.state.fields.beta}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3">Notes:</Form.Label>
              <Col sm="9">
                <Form.Control
                  as='textarea'
                  name="notes"
                  onChange={event => this.handleChange(event)}
                  value={this.state.fields.notes}
                />
              </Col>
            </Form.Group>
            {this.state.error ? <Form.Text> {this.state.error} </Form.Text> : null}
            <Form.Group as={Row}>
              <Button variant="secondary" type="submit">
                Submit Entry
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    )
  }
}

export default Logform