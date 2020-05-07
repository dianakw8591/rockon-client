import React, {useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import _ from 'lodash';
import StatsLogEntry from './StatsLogEntry';

export default function StatsLogContainer(props) {
  const { entries } = props;
  const sortedByDate = _.groupBy(entries, 'start_date');
  const [activeDate, setActiveDate] = useState(null);

  const select = (date) => {
    setActiveDate(date)
  }

  return (
    <div className="overflow-auto mh-100 position-absolute sm-shadow" style={{width: 'calc(100% - 64px)', height: 'calc(100% - 64px)'}}>
      <ListGroup variant="flush">
      {_.map(sortedByDate, (arr, date) => {
        return <StatsLogEntry key={date} date={date} showDetails={ activeDate === date } onSelect={select} entries={arr} />
      })}
      </ListGroup>
    </div>
  )
}