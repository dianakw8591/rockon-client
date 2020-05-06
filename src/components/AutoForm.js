import React, { useState } from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';

//suggestion functions from react-autosuggest example code, converted to use in a functional component

export default function AutoForm(props) {

  const { autoList, area, parents, onSelectRoute } = props;

  // Autosuggest is a controlled component.
  // This means that you need to provide an input value
  // and an onChange handler that updates this value (see below).
  // Suggestions also need to be provided to the Autosuggest,
  // and they are initially empty because the Autosuggest is closed.

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [noMatch, setNoMatch] = useState(false)

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : autoList.filter(climb =>
      climb.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.name;

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Type a route name',
    value,
    onChange,
  };

  //My function for handling search submission
  const handleSubmit = e => {
    e.preventDefault();
    setNoMatch(false)
    const selectedClimb = autoList.find(route => route.name === value)
    if (selectedClimb) {
      onSelectRoute(selectedClimb)
      setValue('')
    } else {
      setNoMatch(true)
      setValue('')
    }
  }

  return (
    <>
      <Card className="text-center">
        <Card.Header>
          <h6>{area.name} ({parents})</h6>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Col className='text-right' md='4'>
              <Form.Label >Search {area.name} routes:</Form.Label>
              </Col>
              <Col md='4'>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
              </Col>
              <Col md='2'>
                <Button variant="outline-info" type="submit" >
                  Select Climb
                </Button>
              </Col>
              <Col></Col>
            </Form.Group>
            {noMatch ? <Form.Text> No route matches your search. Try again. </Form.Text> : null}
          </Form>
        </Card.Body>
      </Card>
      <br />
    </>
  )
}