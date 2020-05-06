import React, { useState } from 'react';
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';
import { api } from '../services/api';
import SelectClimb from './SelectClimb';
import SelectArea from './SelectArea';
import AutoForm from './AutoForm';


function RouteSelecter(props) {
  // user input from intial search form
  const [searchC, setSearchC] = useState('');
  const [searchA, setSearchA] = useState('');

  // results from search for climbs or areas
  const [climbs, setClimbs] = useState(null);
  const [areas, setAreas] = useState(null)

  //save the selected area and the formatted parent array
  const [selectedA, setSelectedA] = useState(null);
  const [parents, setParents] = useState(null)
  // all climbs for selected area, for use in autosuggest route form
  const [autoList, setAutoList] = useState(null);

  const handleRouteSubmit = (e) => {
    e.preventDefault();
    api.climb.searchClimbs(searchC)
      .then(data => {
        props.onSearch();
        setAreas(null);
        setSelectedA(null);
        setClimbs(data.climbs);
        setSearchC("");
      })
  }

  const selectRoute = (climb) => {
    props.onSelectRoute(climb)
    setClimbs(null)
  }

  const handleAreaSubmit = (e) => {
    e.preventDefault();
    api.area.searchAreas(searchA)
      .then(data => {
        props.onSearch();
        setClimbs(null);
        setSelectedA(null);
        setAreas(data);
        setSearchA("");
      })
  }

  const selectArea = (area, parentArray) => {
    api.area.getArea(area.id)
      .then(data => {
        setAutoList(data)
        setSelectedA(area)
        setParents(parentArray)
        setAreas(null)
      })
  }

  return (
    <>
      <br />
      <br />
      <Row>
        <Col className='text-center'>
          <h6>To add an entry, first find the climb. Search either by route name or by area.</h6>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Form onSubmit={handleRouteSubmit}>
            <Form.Group as={Row} controlId='routeform'>
              <Form.Label column sm="3">Route name:</Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  name="routeinpute"
                  placeholder="Try 'nose'..."
                  onChange={(event) => setSearchC(event.target.value)}
                  value={searchC}
                />
              </Col>
              <Button variant="outline-info" type="submit" column='true' >
                Search
          </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form onSubmit={handleAreaSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">OR Area name:</Form.Label>
              <Col sm="7">
                <Form.Control
                  type="text"
                  name="areainput"
                  placeholder="Try 'el cap'..."
                  onChange={(event) => setSearchA(event.target.value)}
                  value={searchA}
                />
              </Col>
              <Button variant="outline-info" type="submit" column='true' >
                Search
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <div>
        {climbs ?
          (climbs.length === 0 ?
            <h5>No results found. Please try again.</h5>
            :
            <div>
              <h6>Select a climb:</h6>
              <ListGroup variant="flush">
                {climbs.map(climb => <SelectClimb key={climb.id} climb={climb} onSelectRoute={selectRoute} />)}
              </ListGroup>
            </div>) :
          null}
        {areas ?
          (areas.length === 0 ?
            <h5>No results found. Please try again.</h5>
            :
            <div>
              <h6>Select an area:</h6>
              <ListGroup variant="flush">
                {areas.map(area => <SelectArea key={area.id} area={area} onSelectArea={selectArea} />)}
              </ListGroup>
            </div>) :
          null}
        {selectedA ? <AutoForm autoList={autoList} area={selectedA} parents={parents} onSelectRoute={selectRoute} /> : null}
      </div>
    </>
  )
}

export default RouteSelecter