import React, { useState, useEffect } from 'react';
import AuthHOC from '../HOCs/authHOC';
import { Route, Redirect } from "react-router-dom";
import { api } from '../services/api';
import Logbook from './Logbook';
import Stats from '../components/Stats';
import Onboard from '../components/Onboard'


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

  const deleteEntry = (entry_id) => {
    api.entry.deleteEntry(entry_id, authUser.id)
      .then(data => {
        setEntries(entries.filter(entry => entry.id !== entry_id))
      })
  }

  const sortByDate = () => {
    if (entries.length > 0) {
      return entries.sort((a, b) => (a.start_date > b.start_date) ? -1 : ((b.start_date > a.start_date) ? 1 : 0))
    } else {
      return entries
    }
  }

  return (
    <>
      {loading ? <div><h2>Loading...</h2></div> :
        <>
          <Route exact path='/dashboard/stats'>
            {entries.length > 0 ? <Stats entries={sortByDate()} /> : <Redirect to="/dashboard/onboard" />}
          </Route>
          <Route exact path='/dashboard/onboard'>
            {entries.length > 0 ? <Redirect to='/dashboard/stats' />:  <Onboard />}
          </Route>
          <Route path={`/dashboard/log`} render={(props) => <Logbook {...props} id={authUser.id} onAddEntry={addEntry} entries={sortByDate()} onDeleteEntry={deleteEntry} />} />
        </>}
    </>

  )
}

export default AuthHOC(Dashboard)
