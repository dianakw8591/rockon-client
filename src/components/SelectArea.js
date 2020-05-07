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
      <span className="font-weight-bold">{name}</span><span> ({parentArray(area)})</span>
    </ListGroup.Item>
  )
}

export default SelectArea