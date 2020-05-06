import React, { useState } from 'react';
import { Container, Toast } from 'react-bootstrap';
import Logform from '../components/Logform';
import LogEntry from '../components/LogEntry';
import RouteSelecter from '../components/RouteSelecter';


function Logbook(props) {
  const { id, onAddEntry, entries, onDeleteEntry } = props;
  const [showForm, setShowForm] = useState(false);
  const [climb, setClimb] = useState('');
  const [showToast, setShowToast] = useState(false)

  const search = () => {
    setShowForm(false);
  }

  const selectRoute = (climb) => {
    setClimb(climb);
    setShowForm(true);
  }

  const submit = (resp) => {
    onAddEntry(resp)
    setShowToast(true)
  }
  return (

    <div>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide
        style={{
          width: 800,
          position: 'fixed',
          zIndex: 1,
          top: 24,
          right: 24,
        }}
      >
        <Toast.Header >
          <strong className="mr-auto text-success">Success!</strong>
        </Toast.Header>
        <Toast.Body className='text-center'>Entry Logged</Toast.Body>
      </Toast>
      <Container fluid="xl">
        <RouteSelecter onSelectRoute={selectRoute} onSearch={search} />
        {showForm ? <Logform climb={climb} id={id} onSubmit={submit} /> : null}
        <hr style={{
          color: 'black',
          backgroundColor: 'rgb(191, 190, 190)',
          height: 1
        }} />
        {entries.length > 0 ? entries.map(entry => <LogEntry key={entry.id} entry={entry} onDeleteEntry={onDeleteEntry} />) : <h4>No climbs recorded yet!</h4>}
      </Container>
    </div>
  )
}

export default Logbook