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
    1: "5.0 (VB)",
    2: "5.1 (VB)",
    3: "5.2 (VB)",
    4: "5.3 (VB)",
    5: "5.4 (VB)",
    6: "5.5 (VB)",
    7: "5.6 (VB)",
    8: "5.7 (VB)",
    9: "5.8 (VB)",
    10: "5.9 (V0)",
    11: "5.10a (V0)",
    12: "5.10b (V0)",
    13: "5.10c (V1)",
    14: "5.10d (V1)",
    15: "5.11a (V2)",
    16: "5.11b (V2)",
    17: "5.11c (V3)",
    18: "5.11d (V4)",
    19: "5.12a (V5)",
    20: "5.12b (V5)",
    21: "5.12c (V6)",
    22: "5.12d (V7)",
    23: "5.13a (V7)",
    24: "5.13b (V8)",
    25: "5.13c (V8)",
    26: "5.13d (V9)",
    27: "5.14a (V10)",
    28: "5.14b (V11)",
    29: "5.14c (V12)",
    30: "5.14d (V13)",
    31: "5.15a (V14)",
    32: "5.15b (V15)",
    33: "5.15c (V16)",
    34: "5.15d (V17)",
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
        <Col md={10}>
        <Graph entries={filtered} />
        </Col>
      <Col>
      <Card className="text-center shadow-sm" >
          <Card.Header><h5>Your Totals:</h5></Card.Header>
        <Card.Body>
          <Card.Text><strong>Climbs: <span className='text-success'>{totalClimbs(filtered)}</span></strong></Card.Text>
          <Card.Text><strong>Days out: <span className='text-success'>{totalDays(filtered)}</span></strong></Card.Text>
          <Card.Text><strong>Pitches: <span className='text-success'>{totalPitches(filtered)}</span></strong></Card.Text>
        </Card.Body>
        </Card>
        </Col>
        </Row>
        <Row style={{paddingTop: '32px'}}>
          <Col>
            <BarGraph entries={filtered} />
          </Col>
          <Col>
            <Card className='shadow-sm'>
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

