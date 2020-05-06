import React from 'react';
import { ListGroup } from 'react-bootstrap';

function SelectClimb(props) {
  const { climb, onSelectRoute } = props;
  const { name, pitches, full_type, rating, area_array, key_type } = props.climb;

  const area = () => {
    return area_array.join(' > ')
  }

  return (
    <ListGroup.Item action variant='light' onClick={() => onSelectRoute(climb)}>
      <span className="font-weight-bold">{name}</span><span> ({area()})</span>
      <div>{full_type + ' ' + rating + (key_type !== "Boulder" ? (' pitches: ' + pitches) : '')}</div>
    </ListGroup.Item>
  )
}

export default SelectClimb