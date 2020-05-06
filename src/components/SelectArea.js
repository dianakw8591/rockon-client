import React from 'react';
import { ListGroup } from 'react-bootstrap';

function SelectArea(props) {
  const { area, onSelectArea } = props;
  const { name } = props.area;

  const parentArray = (area) => {
    let parents = [];
    function buildArray(area) {
      if (area.parent) {
        parents.push(area.parent.name)
        buildArray(area.parent)
      } else {
        return parents;
      }
    }

    buildArray(area)
    return parents.join(' < ')
  }

  return (
    <ListGroup.Item action variant='light' onClick={() => onSelectArea(area, parentArray(area))}>
      <h6>{name} ({parentArray(area)})</h6>
    </ListGroup.Item>
  )
}

export default SelectArea