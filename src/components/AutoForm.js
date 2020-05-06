import React, { useState } from 'react';
import { ListGroup, Button, Form, Row, Col, Jumbotron } from 'react-bootstrap';
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
      <ListGroup.Item variant='dark'>
        <h6>{area.name} ({parents})</h6>
      </ListGroup.Item>
      <br />
      <br />
      <Jumbotron>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">Search routes:</Form.Label>
            <Col sm="4">
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
            </Col>
            <Button variant="secondary" type="submit" column='true'>
              Select Climb
                </Button>
          {noMatch ? <Form.Text> No route matches your search. Try again. </Form.Text> : null}
          </Form.Group>
        </Form>
      </Jumbotron>
    </>
  )
}