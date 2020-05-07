import React, { useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import * as moment from 'moment';
import _ from 'lodash';
import Graph from './Graph';
import BarGraph from './BarGraph';
import StatsLogContainer from './StatsLogContainer';
import DashboardLayout from '../containers/DashboardLayout';
import MultiRange from './MultiRange';


function Stats(props) {
  const { entries } = props;

  //dates

  const firstDate = moment(entries[entries.length - 1].start_date).toDate();
  const lastDate = moment(entries[0].start_date).toDate();

  const [start, setStart] = useState(firstDate)
  const [end, setEnd] = useState(lastDate)

  //grades

  const minGrade = _.minBy(entries, 'climb.numeric_rating').climb.numeric_rating
  const maxGrade = _.maxBy(entries, 'climb.numeric_rating').climb.numeric_rating

  const [grade, setGrade] = useState({
    low: minGrade,
    high: maxGrade
  })

  const mapNumericGrade = {
    1: "5.0",
    2: "5.1",
    3: "5.2",
    4: "5.3",
    5: "5.4",
    6: "5.5",
    7: "5.6",
    8: "5.7",
    9: "5.8",
    10: "5.9",
    11: "5.10a",
    12: "5.10b",
    13: "5.10c",
    14: "5.10d",
    15: "5.11a",
    16: "5.11b",
    17: "5.11c",
    18: "5.11d",
    19: "5.12a",
    20: "5.12b",
    21: "5.12c",
    22: "5.12d",
    23: "5.13a",
    24: "5.13b",
    25: "5.13c",
    26: "5.13d",
    27: "5.14a",
    28: "5.14b",
    29: "5.14c",
    30: "5.14d",
    31: "5.15a",
    32: "5.15b",
    33: "5.15c",
    34: "5.15d",
  }

  //types

  const [keytype, setKeytype] = useState({
    Trad: true,
    Sport: true,
    Boulder: true,
  })

  const typeArray = Object.keys(keytype).filter(key => keytype[key])

  //styles

  const [style, setStyle] = useState({
    'Lead': true,
    'Swap Leads': true,
    'Follow': true,
    'Toprope': true,
    'Solo': true,
    'Simul': true,
  })

  const styleArray = Object.keys(style).filter(key => style[key])

  //outcomes

  const [outcome, setOutcome] = useState({
    'Onsight': true,
    'Flash': true,
    'Redpoint': true,
    'Pinkpoint': true,
    'Tronsight': true,
    'No Falls': true,
    'TR Attempt': true,
    'Repeat': true,
    'Attempt': true
  })

  const outcomeArray = Object.keys(outcome).filter(key => outcome[key])

  //change handlers

  const handleStartDateChange = date => setStart(date);
  const handleEndDateChange = date => setEnd(date);
  const handleTypeToggle = ({ target }) => setKeytype(s => ({ ...s, [target.name]: !s[target.name] }));
  const handleStyleToggle = ({ target }) => setStyle(s => ({ ...s, [target.name]: !s[target.name] }));
  const handleOutcomeToggle = ({ target }) => setOutcome(s => ({ ...s, [target.name]: !s[target.name] }));

  //for adding classnames to color text
  const mappingRopeOutcomes = {
    'Onsight': 'Send',
    'Flash': 'Send',
    'Redpoint': 'Send',
    'Pinkpoint': 'Send',
    'Repeat': 'Repeat',
    'Tronsight': 'TR',
    'No Falls': 'TR',
    'TR Attempt': 'TR',
    'Attempt': 'Attempt'
  };

  // const mappingBoulderOutcomes = {
  //   'Flash': 'Flash',
  //   'Redpoint': 'Send',
  //   'Repeat': 'Repeat',
  //   'Attempt': 'Attempt'
  // }


  // filter the entries list to pass into all forms of viewing data

  const filtered = entries
    .filter(e => moment(e.start_date) >= moment(start))
    .filter(e => moment(e.start_date) <= moment(end))
    .filter(e => typeArray.includes(e.climb.key_type))
    .filter(e => e.climb.key_type === "Boulder" || styleArray.includes(e.style))
    .filter(e => outcomeArray.includes(e.outcome))
    .filter(e => e.climb.numeric_rating >= grade.low && e.climb.numeric_rating <= grade.high)

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

  const sidebar = <StatsLogContainer entries={filtered} />

  return (
    <DashboardLayout sidebar={sidebar}>
      <>
        <Row>
          <Col><strong>Total climbs: {totalClimbs(filtered)}</strong></Col>
          <Col><strong>Total days out: {totalDays(filtered)}</strong></Col>
          <Col><strong>Total pitches: {totalPitches(filtered)}</strong></Col>
        </Row>
        <Graph entries={filtered} />
        <Row>
          <Col>
            <BarGraph entries={filtered} />
          </Col>
          <Col>
            <Card>
              <Card.Header>
                <strong>Apply Filters:</strong>
              </Card.Header>
              <Card.Body>
                <Form>
                  {/* <Form.Label>Filter Options:</Form.Label> */}
                  <Form.Row>
                  <Form.Group as={Col} >
                    <Form.Label >Start date:</Form.Label>
                    <span style={{paddingLeft: '8px'}}>
                      <DatePicker
                        name='start_date'
                        onChange={handleStartDateChange}
                        value={start}
                      />
                      </span>
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Form.Label >End date:</Form.Label>
                    <span style={{paddingLeft: '8px'}}>
                      <DatePicker
                        name='end_date'
                        onChange={handleEndDateChange}
                        value={end}
                      />
                      </span>
                  </Form.Group>
                  </Form.Row>
                  <Form.Group as={Row} >
                    <Form.Label column sm='3'>Select type:</Form.Label>
                    <Col>
                      <div key={`inline-checkbox`} className="mb-3">
                        {Object.keys(keytype).map(key => (
                          <span className={key} key={key}>
                            <Form.Check inline
                              type="checkbox"
                              onChange={handleTypeToggle}
                              label={key}
                              name={key}
                              checked={keytype[key]}
                            />
                          </span>
                        ))}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} >
                    <Form.Label column sm='3'>Select styles:</Form.Label>
                    <Col>
                      <div key={`inline-checkbox`} className="mb-3">
                        {Object.keys(style).map(key => (
                          <Form.Check inline
                            type="checkbox"
                            onChange={handleStyleToggle}
                            label={key}
                            key={key}
                            name={key}
                            checked={style[key]}
                          />
                        ))}
                      </div>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} >
                    <Form.Label column sm='3'>Select outcomes:</Form.Label>
                    <Col>
                      <div key={`inline-checkbox`} className="mb-3">
                        {Object.keys(outcome).map(key => (
                          <span className={mappingRopeOutcomes[key]} key={key}>
                            <Form.Check inline
                              type="checkbox"
                              onChange={handleOutcomeToggle}
                              label={key}
                              name={key}
                              checked={outcome[key]}
                            />
                          </span>
                        ))}
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
                <Row >
                  <Col>
                    Select grade range:
              </Col>
                </Row>
                <Row>
                  <Col>
                    Low: {mapNumericGrade[grade.low]}
                  </Col>
                  <Col className="d-flex justify-content-end">
                    High: {mapNumericGrade[grade.high]}
                  </Col>
                </Row>
                <MultiRange value={grade} onChange={setGrade} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    </DashboardLayout>
  )
}

export default Stats

