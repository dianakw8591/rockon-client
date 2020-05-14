import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import EditEntryForm from './EditEntryForm';

function LogEntry(props) {
  const { pitches, start_date, style, outcome, rack, beta, notes, partners, id } = props.entry;
  const { name, full_type, rating, area_array, key_type } = props.entry.climb;

  const area = () => {
    return area_array.join(' > ')
  }

  const [showEdit, setShowEdit] = useState(false)

  const update = (entry) => {
    setShowEdit(false)
    props.onUpdateEntry(entry)
  }

  const cancel = () => {
    setShowEdit(false)
  }

  return (
    <Card>
      <Card.Header className={key_type}>
        <strong>{start_date + ': '}
          <label>
            {name}
          </label></strong>
        {' in ' + area()}
      </Card.Header>
      { showEdit ? 
      <EditEntryForm entry={props.entry} onUpdate={update} onCancel={cancel} id={props.id} />
      :
      <Card.Body>
        <Row>
          <Col>
            <Card.Text >
              <strong>{rating + ' ' + full_type}
              {(pitches ? ` pitches: ${pitches}` : '')}</strong>
            </Card.Text>
          </Col>
          <Col>
            <Card.Text >
              {(style ? `${style}, ` : '') + outcome + (partners ? ` with ${partners}` : '')}
            </Card.Text>
          </Col>
          <Col className='d-flex justify-content-end'>
            <Button variant="outline-info" style={{marginRight: '10px'}} onClick={() => setShowEdit(true)}>Edit</Button>
            <Button variant="outline-danger" onClick={() => props.onDeleteEntry(id)}>Delete</Button>
          </Col>
        </Row>
        {rack ? <><Row><Col><strong>Rack:</strong> {rack}</Col></Row></> : null}
        {beta ? <><Row><Col><strong>Beta:</strong> {beta}</Col></Row></> : null}
        {notes ? <><Row><Col><strong>Notes:</strong> {notes}</Col></Row></> : null}
      </Card.Body>
      }
    </Card>
  )
}

export default LogEntry