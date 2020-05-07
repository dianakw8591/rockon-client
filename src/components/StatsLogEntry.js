import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap';
import _ from 'lodash';

export default function StatsLogEntry(props) {
  const { entries, date, onSelect, showDetails } = props;

  //used if entries.length === 0
  const singleEntry = entries[0];
  // const { name, rating, climb_id } = singleEntry.climb;

  //used for multiple entries
  const groupByType = _.groupBy(entries, 'climb.key_type');
  const multiEntries = _.map(groupByType, (arr, type) => `${type}: ${arr.length} ${arr.length > 1 ? 'climbs' : 'climb'}`)

  //find most specific common area for multiple entries
  const areaArrays = entries.map(entry => entry.climb.area_array);
  const minLength = _.min(areaArrays.map(areas => areas.length))

  const commonArea = () => {
    let i = 0;
    while (i <= minLength) {
      let first = null;
      let found = areaArrays.find(areas => {
        let area = areas[i];
        if (!first) {
          first = area;
          return false;
        } else {
          return first !== area;
        }
      })
      if (found) {
        break
      } else {
        i++
      }
    }
    return areaArrays[0].slice(0, i).join(' > ')
  }

  //div displayed on click
  const infoDiv = entry => {
    const { style, outcome, partners, notes, rack, beta } = entry;
    return (
      <div>
        {entry.climb.key_type !== "Boulder" ? <div>Style: {style}</div> : null}
        Outcome: {outcome}
        {partners ? <div>Partners: {partners}</div> : null}
        {rack ? <div>Rack: {rack}</div> : null}
        {beta ? <div>Beta: {beta}</div> : null}
        {notes ? <div>Notes: {notes}</div> : null}
      </div>
    )
  }

  const climbLink = entry => {
    const { name, rating, climb_id } = entry.climb;
    return (
      <Link to={`/dashboard/climbs/${climb_id}`}>{name} {rating}</Link>
    )
  }

  //showDetails is a boolean, onSelect takes a date

  return (
    <ListGroup.Item action onClick={() => onSelect(date)}>
      <div className="d-flex justify-content-between" >
        <span><h6>{date}</h6></span>
        <span text-allign='right'>{entries.length === 1 ?
          climbLink(singleEntry) :
          multiEntries.map(type => <div key={type}>{type}</div>)}</span>
      </div>
      {showDetails ?
        <>
          <div>
            {commonArea()}
          </div>
          {entries.length === 1 ?
            infoDiv(singleEntry) :
            <>
              {entries.map(entry => {
                return (
                  <Fragment key={entry.id}>
                    {climbLink(entry)}
                    {infoDiv(entry)}
                  </Fragment>)
              })}
            </>
          } </> : null}
    </ListGroup.Item>
  )
}
