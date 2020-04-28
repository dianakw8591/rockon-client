import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Logform from '../components/Logform';
import LogEntry from '../components/LogEntry';
import RouteSelecter from '../components/RouteSelecter';


function Logbook(props) {
  const { id, onAddEntry, entries } = props;
  const [showForm, setShowForm] = useState(false);
  const [climb, setClimb] = useState('');

  const search = () => {
    setShowForm(false);
  }

  const selectRoute = (climb) => {
    setClimb(climb);
    setShowForm(true);
  }

  return (
    <div>
      <Container fluid="xl">
      <RouteSelecter onSelectRoute={selectRoute} onSearch={search} />
      {showForm ? <Logform climb={climb} id={id} onAddEntry={onAddEntry} /> : null}
        {entries.map(entry => <LogEntry key={entry.id} entry={entry} />)}
      </Container>
    </div>
  )
}

export default Logbook