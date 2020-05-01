import React, { useState } from 'react';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import * as moment from 'moment';
import Graph from './Graph';

function Stats(props) {
  const { entries } = props;

  const firstDate = moment(entries[entries.length - 1].start_date).toDate();
  const lastDate = moment(entries[0].start_date).toDate();
  // const outcomes = ['Onsight', 'Flash', 'Tronsight', 'Pinkpoint', 'Redpoint', 'No Falls', 'Repeat', 'Attempt'];
  // const boulder_outcomes = ['Flash', 'Redpoint', 'Repeat', 'Attempt'];
  // const styles = ['Lead', 'Swap Leads', 'Follow', 'Toprope', 'Solo']

  const [start, setStart] = useState(firstDate)
  const [end, setEnd] = useState(lastDate)

  const [keytype, setKeytype] = useState({
    Trad: true,
    Sport: true,
    Boulder: true,
  })

  const typeArray = Object.keys(keytype).filter(key => keytype[key])

  // const [style, setStyle] = useState(styles)
  // const [outcome, setOutcome] = useState(outcomes)


  const handleStartDateChange = date => {
    setStart(date);
  }

  const handleEndDateChange = date => {
    setEnd(date);
  }

  const handleTypeToggle = ({ target }) => setKeytype(s => ({ ...s, [target.name]: !s[target.name] }));

  // filter the entries list to pass into all forms of viewing data

  const filtered = entries
    .filter(e => moment(e.start_date) >= moment(start))
    .filter(e => moment(e.start_date) <= moment(end))
    .filter(e => typeArray.includes(e.climb.key_type))

  

  // functions to display data
  const totalDays = (log) => {
    let hash = {};
    log.forEach(entry => {
      hash[entry.start_date] = 1;
    });
    return Object.keys(hash).length
  }

  const totalClimbs = (log) => {
    return log.length
  }

  const totalPitches = (log) => {
    let sum = 0;
    log.forEach(entry => {
      if (entry.pitches) {
        sum += entry.pitches;
      }
    })
    return sum;
  }

  return (  entries.length > 0 ? 
    <Container fluid="xl">
    <Graph entries={filtered}/>
      <Card>
        <Row>
          <Col><h4>Total climbs: {totalClimbs(filtered)}</h4></Col>
          <Col><h4>Total days out: {totalDays(filtered)}</h4></Col>
          <Col><h4>Total pitches: {totalPitches(filtered)}</h4></Col>
        </Row>
      </Card>
      <Form>
        <Form.Label>Filter Options:</Form.Label>
        <Form.Group as={Row} >
          <Form.Label column >Start date:</Form.Label>
          <Col >
            <DatePicker
              name='start_date'
              onChange={handleStartDateChange}
              value={start}
            />
          </Col>
          <Form.Label column >End date:</Form.Label>
          <Col >
            <DatePicker
              name='end_date'
              onChange={handleEndDateChange}
              value={end}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="style" >
          <Form.Label column sm='2'>Select styles:</Form.Label>
          <Col>
            <div key={`inline-checkbox`} className="mb-3">
              {Object.keys(keytype).map(key => (
                <Form.Check inline
                  type="checkbox"
                  onChange={handleTypeToggle}
                  label={key}
                  key={key}
                  name={key}
                  checked={keytype[key]}
                />
              ))}
            </div>
          </Col>
        </Form.Group>
      </Form>
    </Container> 
  : <h4>To get started, add an entry to your logbook by clicking the button above </h4>
  )
}

export default Stats

// Date range
// total climbs, total days, total pitches
// filter type
// filter grade Range
// filter style
// filter outcome