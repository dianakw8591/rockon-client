import React from 'react';

function SelectClimb(props) {
  const { climb, onSelectRoute } = props;
  const { name, pitches, full_type, rating, area_array } = props.climb;

  const area = () => {
    return area_array.join('>')
  }

  return (
    <>
      <div onClick={() => onSelectRoute(climb)}>
        <h6>{name}</h6>
        {area()}<br />
        {full_type + ' ' + rating + ' pitches: ' + pitches}
      </div><br />
    </>
  )
}

export default SelectClimb