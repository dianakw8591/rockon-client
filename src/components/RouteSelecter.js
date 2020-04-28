import React, { useState } from 'react';
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';
import { api } from '../services/api';
import SelectClimb from './SelectClimb';


function RouteSelecter(props) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(false);
  const [climbs, setClimbs] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.climb.searchClimbs(search)
      .then(data => {
        props.onSearch();
        setClimbs(data.climbs);
        setResults(true);
        setSearch("");
      })
  }

  const selectRoute = (climb) => {
    setResults(false);
    props.onSelectRoute(climb)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Search for a climb by name:</Form.Label>
        <br />
        <br />
        <Form.Group as={Row}>
          <Form.Label column sm="2">Route:</Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              name="name"
              placeholder="Try 'nose'..."
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
          </Col>
          <Button variant="secondary" type="submit" column='true' >
            Search
          </Button>
        </Form.Group>
      </Form>
      <div>
        {results ?
          (climbs.length === 0 ?
            <h4>No results found. Please try again.</h4> :
            <div>
              <h5>Select a climb:</h5>
              <ListGroup variant="flush">
                {climbs.map(climb => <SelectClimb key={climb.id} climb={climb} onSelectRoute={selectRoute} />)}
              </ListGroup>
            </div>) :
          null}
      </div>
    </>
  )
}

export default RouteSelecter