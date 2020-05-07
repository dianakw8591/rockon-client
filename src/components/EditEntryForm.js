import React, { Component } from 'react';
import { Button, Form, Col, Card } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import * as moment from 'moment';
import { api } from '../services/api';
import '../App.css';

export default class EditEntryForm extends Component {
  state = {
    error: false,
    fields: {
      pitches: this.props.entry.pitches,
      start_date: moment(this.props.entry.start_date).toDate(),
      style: this.props.entry.style,
      outcome: this.props.entry.outcome,
      partners: this.props.entry.partners,
      rack: this.props.entry.rack,
      notes: this.props.entry.notes,
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
    const data = { entry: { ...this.props.entry, ...this.state.fields, start_date: moment(this.state.fields.start_date).format('YYYY-MM-DD') } };
    api.entry.updateEntry(data, this.props.id).then(resp => {
      if (!resp.error) {
        this.setState({ error: false })
        this.props.onUpdate(resp);
      } else {
        this.setState({
          error: resp.error,
        })
      }
    });
  };



  createOptions = (array) => {
    return array.map(e => <option value={e} key={e}>{e}</option>)
  }

  outcomes = ['Onsight', 'Flash', 'Redpoint', 'Pinkpoint', 'Repeat', 'Tronsight', 'No Falls', 'TR Attempt', 'Attempt'];
  boulder_outcomes = ['Flash', 'Redpoint', 'Repeat', 'Attempt'];
  styles = ['Lead', 'Swap Leads', 'Follow', 'Toprope', 'Solo', 'Simul'];

  render() {
    const { key_type } = this.props.entry.climb;
    return (
      <Card.Body>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label ><h5>Edit your entry:</h5></Form.Label>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Date:</Form.Label><br />
              <div>
                <DatePicker
                  name='start_date'
                  onChange={this.handleDateChange}
                  value={this.state.fields.start_date}
                />
              </div>
            </Form.Group>
            {key_type !== "Boulder" ?
              <>
                <Form.Group as={Col}>
                  <Form.Label >Pitches:</Form.Label>
                  <Form.Control
                    type="number"
                    name="pitches"
                    onChange={event => this.handleChange(event)}
                    value={this.state.fields.pitches}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Style:</Form.Label>
                  <Form.Control
                    as="select"
                    name="style"
                    value={this.state.fields.style}
                    onChange={event => this.handleChange(event)}>
                    {this.createOptions(this.styles)}
                  </Form.Control>
                </Form.Group>
              </>
              : <></>}
            <Form.Group as={Col}>
              <Form.Label >Outcome:</Form.Label>
              <Form.Control
                as="select"
                name='outcome'
                value={this.state.fields.outcome}
                onChange={event => this.handleChange(event)}>
                {key_type !== "Boulder" ? this.createOptions(this.outcomes) : this.createOptions(this.boulder_outcomes)}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label >Partners:</Form.Label>
              <Form.Control
                type="text"
                name="partners"
                onChange={event => this.handleChange(event)}
                value={this.state.fields.partners}
              />
            </Form.Group>
            {key_type !== "Boulder" ?
              <Form.Group as={Col}>
                <Form.Label >Rack:</Form.Label>
                <Form.Control
                  type="text"
                  name="rack"
                  onChange={event => this.handleChange(event)}
                  value={this.state.fields.rack}
                />
              </Form.Group>
              : <></>}
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Beta:</Form.Label>
              <Form.Control
                as='textarea'
                name="beta"
                onChange={event => this.handleChange(event)}
                value={this.state.fields.beta}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label >Notes:</Form.Label>
              <Form.Control
                as='textarea'
                name="notes"
                onChange={event => this.handleChange(event)}
                value={this.state.fields.notes}
              />
            </Form.Group>
          </Form.Row>
          {this.state.error ? <Form.Text> {this.state.error} </Form.Text> : null}
          <Form.Row className='justify-content-center'>
            <Button variant="outline-info" type="submit" style={{ marginRight: '10px' }}>
              Update Entry
              </Button>
            <Button variant="outline-danger" onClick={() => this.props.onCancel()}>
              Cancel
            </Button>
          </Form.Row>
        </Form>
      </Card.Body>

    )
  }
}