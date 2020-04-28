import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function LogEntry(props) {
  const { pitches, start_date, style, outcome, rack, beta, notes, partners } = props.entry;
  const { name, full_type, rating, area_array } = props.entry.climb;

  const area = () => {
    return area_array.join('>')
  }

  return (
    <Card>
      <Card.Header>
        {start_date + ': ' + name + ' in ' + area()}
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Card.Text>
              {rating + ' ' + full_type + ' pitches: ' + pitches + (partners ? ` with ${partners}` : '')}
            </Card.Text>
          </Col>
          <Col>
            {style + ', ' + outcome}
          </Col>
        </Row>
        {rack ? <><Row><Col>Rack: {rack}</Col></Row></> : null}
        {beta ? <><Row><Col>Beta: {beta}</Col></Row></> : null}
        {notes ? <><Row><Col>Notes: {notes}</Col></Row></> : null}
      </Card.Body>
    </Card>
  )
}

export default LogEntry