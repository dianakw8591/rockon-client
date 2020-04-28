import React, {useState, useEffect } from 'react';
import AuthHOC from '../HOCs/authHOC';
import { Link, Route} from "react-router-dom";
import { api } from '../services/api';
import Logbook from './Logbook';


function Dashboard(props) {
  const { authUser } = props;

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.entry.getEntries(authUser.id)
    .then(data => {
      setEntries(data)
      setLoading(false)
    })
  }, [authUser.id])

  const addEntry = (entry) => {
    setEntries([entry, ...entries])
  }

  const sortByDate = () => {
    return entries.sort((a,b) => (a.start_date > b.start_date) ? -1 : ((b.start_date > a.start_date) ? 1 : 0))
  }

  return (
    <div>
      { loading ? <div><h2>Loading...</h2></div> : 
      <>
      {/* <Link to='/dashboard/log'>Logbook</Link> */}
      <Route exact path={`/dashboard/log`} render={(props) => <Logbook {...props} id={authUser.id} onAddEntry={addEntry} entries={sortByDate()} />}/>
      </>}
    </div>
      
  )
}

export default AuthHOC(Dashboard)
