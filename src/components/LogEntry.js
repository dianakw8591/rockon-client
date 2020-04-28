import React from 'react';

function LogEntry(props) {
  const { pitches, start_date, style, outcome, rack, beta, notes } = props.entry;
  const { name, full_type, rating, area_array} = props.entry.climb;

  const area = () => {
    return area_array.join('>')
  }

  return (
    <li>
      <h6>{start_date + ': ' + name}</h6>
        {area()}<br />
        {full_type + ' ' + rating + ' pitches: ' + pitches}<br/>
        {style + ', ' + outcome}<br/>
        { rack ? <><div>Rack: {rack}</div></> : null}
        { beta ? <><div>Beta: {beta}</div></> : null}
        { notes ? <><div>Notes: {notes}</div></> : null}
    </li>      
  )
}

export default LogEntry

// {
//   "id": 5,
//   "pitches": 1,
//   "start_date": "2020-04-27",
//   "end_date": null,
//   "style": "",
//   "led_pitches": "",
//   "outcome": "",
//   "highlight": null,
//   "partners": "",
//   "rack": "",
//   "beta": null,
//   "notes": "sent it!",
//   "climb": {
//       "climb_id": 1596,
//       "name": "Dagger",
//       "full_type": "Trad",
//       "key_type": "Trad",
//       "rating": "5.11a",
//       "numeric_rating": 15,
//       "area_array": [
//           "California",
//           "Yosemite National Park",
//           "Yosemite Valley",
//           "Valley North Side",
//           "Yosemite Falls Area",
//           "Lower Falls Amphitheater"
//       ]
//   }
// }