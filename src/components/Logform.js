import React, { Component } from 'react';
import { Button, Form, Col, ListGroup, Card } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import * as moment from 'moment';
import { api } from '../services/api';
import '../App.css';

class Logform extends Component {
  state = {
    error: false,
    fields: {
      pitches: this.props.climb.pitches || 0,
      start_date: new Date(),
      style: '',
      outcome: '',
      partners: '',
      beta: '',
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
      this.setState({
        fields: {
          ...this.state.fields,
          style: '',
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
    return this.props.climb.area_array.join(' > ')
  }

  createOptions = (array) => {
    return array.map(e => <option value={e} key={e}>{e}</option>)
  }

  outcomes = ['Onsight', 'Flash', 'Redpoint', 'Pinkpoint', 'Repeat', 'Tronsight', 'No Falls', 'TR Attempt', 'Attempt'];
  boulder_outcomes = ['Flash', 'Redpoint', 'Repeat', 'Attempt'];
  styles = ['Lead', 'Swap Leads', 'Follow', 'Toprope', 'Solo', 'Simul'];

  render() {
    const { name, full_type, rating, pitches, key_type } = this.props.climb;

    return (
      <>
        <ListGroup.Item variant='dark'>
          <span className="font-weight-bold">{name}</span><span> ({this.area()})</span>
          <div>{full_type + ' ' + rating + (pitches ? (' pitches: ' + pitches) : '')}</div>
        </ListGroup.Item>
        <br />
        <Card border="info" >
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label ><h5>Log your climb:</h5></Form.Label>
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
                        <option>Select a style</option>
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
                    <option>Select an outcome</option>
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
                <Button variant="outline-info" type="submit">
                  Submit Entry
              </Button>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Logform