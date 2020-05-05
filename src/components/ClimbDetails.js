import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import _ from 'lodash';
import { Row, Col } from 'react-bootstrap';
import StatsLogContainer from './StatsLogContainer';
import DashboardLayout from '../containers/DashboardLayout';
import GraphTimeline from './GraphTimeline';


export default function ClimbDetails(props) {

  const { entries } = props;
  const climbId = props.match.params.id;
  const [climb, setClimb] = useState({});
  const [loading, setLoading] = useState(true);

  // const {
  //   beta: {
  //     gear
  //   } = {}
  // } = climb

  const { name, rating, full_type, key_type, area_array, pitches, mtnproj_id } = climb;

  const area = () => {
    return area_array.join(' > ')
  }

  useEffect(() => {
    api.climb.getClimb(climbId)
      .then(data => {
        setClimb(data)
        setLoading(false)
      })
  }, [climbId])

  const linkedEntries = entries.filter(entry => entry.climb.climb_id === parseInt(climbId));

  const allNotes = _.compact(linkedEntries.map(entry => entry.notes));
  const allBeta = _.compact(linkedEntries.map(entry => entry.beta));
  const allRack = _.compact(linkedEntries.map(entry => entry.rack));
  const outcomes = _.groupBy(linkedEntries, 'outcome');
  const outcomesDiv = _.map(outcomes, (entries, outcome) => {
    return (
      <p key={outcome}>{outcome}: {entries.length}</p>
    )
  })

  return (loading ? <h4>Loading...</h4> :
    <DashboardLayout sidebar={<StatsLogContainer entries={linkedEntries} />}>
      <Row>
        <Col sm={9}>
          <Link to='/dashboard/stats'>{`<< Back to Dashboard`}</Link>
          <br />
          <br />
          <h4>{name}</h4>
          {area()}<br />
          {full_type + ' ' + rating + (key_type !== "Boulder" ? (' pitches: ' + pitches) : '')}<br />
          <a href={`https://www.mountainproject.com/route/${mtnproj_id}`} target="_blank" rel="noopener noreferrer">View on Moutain Project</a>
          <br />
          <br />
          <h6>Outcomes:</h6>
          {outcomesDiv}
          <br />
          <br />
          <h6>All rack beta: </h6>
          <ul>
            {allRack.map(rack => <li key={rack}>{rack}</li>)}
          </ul>
          <h6>All beta: </h6>
          <ul>
            {allBeta.map(beta => <li key={beta}>{beta}</li>)}
          </ul>
          <h6>All notes: </h6>
          <ul>
            {allNotes.map(note => <li key={note}>{note}</li>)}
          </ul>
        </Col>
        <Col>
          <GraphTimeline entries={linkedEntries} />
        </Col>
      </Row>
    </DashboardLayout>
  )
}