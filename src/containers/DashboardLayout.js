import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function DashboardLayout(props) {
  const { children, sidebar } = props;
  return (
    <Container fluid >
      <Row>
        <Col sm={9} className="padding">
          <div className='bglight padding'>
            {children}
          </div>
        </Col>
        <Col sm={3} className="padding ">
          <div className='bglight padding' style={{ height: '100%' }}>
            {sidebar}
          </div>
        </Col>
      </Row>
    </Container>
  )
}