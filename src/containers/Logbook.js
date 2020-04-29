import React, { useState } from 'react';
// import { Route} from "react-router-dom";
import { Container } from 'react-bootstrap';
import Logform from '../components/Logform';
import LogEntry from '../components/LogEntry';
import RouteSelecter from '../components/RouteSelecter';


function Logbook(props) {
  const { id, onAddEntry, entries, onDeleteEntry } = props;
  const [showForm, setShowForm] = useState(false);
  const [climb, setClimb] = useState('');
  const [success, setSuccess] = useState(false)

  const search = () => {
    setShowForm(false);
    setSuccess(false)
  }

  const selectRoute = (climb) => {
    setClimb(climb);
    setShowForm(true);
  }

  const handleSubmit = (resp) => {
    onAddEntry(resp)
    setShowForm(false)
    setSuccess(true)
  }
  return (
    <div>
      <Container fluid="xl">
      <RouteSelecter onSelectRoute={selectRoute} onSearch={search} />
      {showForm ? <Logform climb={climb} id={id} onSubmit={handleSubmit}/> : null}
      {success ? <div>Entry logged!</div> : null}
      {/* <Route exact path='dashboard/log/new' render={<Logform climb={climb} id={id} onAddEntry={onAddEntry}/>}/> */}
      <h4>Your logbook:</h4>
        {entries.length > 0 ? entries.map(entry => <LogEntry key={entry.id} entry={entry} onDeleteEntry={onDeleteEntry} />) : <h4>No climbs recorded yet!</h4>}
      </Container>
    </div>
  )
}

export default Logbook