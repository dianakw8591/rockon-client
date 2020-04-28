import React, {useState} from 'react';
import Logform from '../components/Logform';
import LogEntry from '../components/LogEntry';
import RouteSelecter from '../components/RouteSelecter';


function Logbook(props) {
  const { id, onAddEntry, entries } = props;
  const [showForm, setShowForm] = useState(false);
  const [climb, setClimb] = useState('');

  const selectRoute = (climb) => {
    setClimb(climb);
    setShowForm(true);
  }

  return (
    <div>
      <RouteSelecter onSelectRoute={selectRoute} />
      { showForm ? <Logform climb={climb} id={id} onAddEntry={onAddEntry} /> : null}
      {entries.map(entry => <LogEntry key={entry.id} entry={entry} />)}
    </div>      
  )
}

export default Logbook