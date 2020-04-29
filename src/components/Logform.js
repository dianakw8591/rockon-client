import React, { Component } from 'react';
import { Button, Form, Row, Col, ListGroup, Jumbotron } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import * as moment from 'moment';
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
    const entry = { entry: { ...this.state.fields, start_date: moment(this.state.fields.start_date).format('YYYY-MM-DD'), climb_id: this.props.climb.id } };
    api.entry.addEntry(entry, this.props.id).then(resp => {
      if (!resp.error) {
        this.setState({ error: false })
        this.props.onSubmit(resp);   
      } else {
        this.setState({
          error: resp.error,
        })
      }
      // this.setState({
      //   fields: {
      //     ...this.state.fields,
      //     style: '',
      //     led_pitches: '',
      //     outcome: '',
      //     partners: '',
      //     rack: '',
      //     beta: '',
      //     notes: '',
      //   }
      // })
    });
  };

  area = () => {
    return this.props.climb.area_array.join('>')
  }

  createOptions = (array) => {
    return array.map(e => <option value={e} key={e}>{e}</option>)
  }

  outcomes = ['Onsight', 'Flash', 'Tronsight', 'Pinkpoint', 'Redpoint', 'No Falls', 'Repeat', 'Attempt'];
  boulder_outcomes = ['Flash', 'Redpoint', 'Repeat', 'Attempt'];
  styles = ['Lead', 'Swap Leads', 'Follow', 'Toprope', 'Solo', 'Simul'];

  render() {
    const { name, full_type, rating, pitches, key_type } = this.props.climb;

    return (
      <>
        <ListGroup.Item variant='dark'>
          <h6>{name}</h6>
          {this.area()}<br />
          {full_type + ' ' + rating + (key_type !== "Boulder" ? (' pitches: ' + pitches) : '')}
        </ListGroup.Item>
        <br />
        <br />
        <Jumbotron>

          <Form onSubmit={this.handleSubmit}>
            <Form.Label>Log your climb:</Form.Label>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Date:</Form.Label>
              <Col sm="4">
                <DatePicker
                  name='start_date'
                  onChange={this.handleDateChange}
                  value={this.state.fields.start_date}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              {key_type !== "Boulder" ?
                <>
                  <Form.Label column sm="1">Pitches:</Form.Label>
                  <Col sm="1">
                    <Form.Control
                      type="number"
                      name="pitches"
                      onChange={event => this.handleChange(event)}
                      value={this.state.fields.pitches}
                    />
                  </Col>
                  <Form.Label column sm="1">Style:</Form.Label>
                  <Col sm="2">
                    <Form.Control
                      as="select"
                      name="style"
                      value={this.state.fields.style}
                      onChange={event => this.handleChange(event)}>
                      <option>Select a style</option>
                      {this.createOptions(this.styles)}
                    </Form.Control>
                  </Col>
                </>
                : <></>}
              <Form.Label column sm="1">Outcome:</Form.Label>
              <Col sm="2">
                <Form.Control
                  as="select"
                  name='outcome'
                  value={this.state.fields.outcome}
                  onChange={event => this.handleChange(event)}>
                  <option>Select an outcome</option>
                  {key_type !== "Boulder" ? this.createOptions(this.outcomes) : this.createOptions(this.boulder_outcomes)}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">Partners:</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="partners"
                  onChange={event => this.handleChange(event)}
                  value={this.state.fields.partners}
                />
              </Col>
            </Form.Group>
            {key_type !== "Boulder" ?
              <Form.Group as={Row}>
                <Form.Label column sm="2">Rack:</Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    name="rack"
                    onChange={event => this.handleChange(event)}
                    value={this.state.fields.rack}
                  />
                </Col>
              </Form.Group>
              : <></>}
            <Form.Group as={Row}>
              <Form.Label column sm="2">Beta:</Form.Label>
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
              <Form.Label column sm="2">Notes:</Form.Label>
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
        </Jumbotron>
      </>
    )
  }
}

export default Logform