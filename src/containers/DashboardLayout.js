import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function DashboardLayout(props) {
  const { children, sidebar } = props;
  return (
    <Container fluid >
      <Row>
        <Col sm={9} className="padding">
          {children}
        </Col>
        <Col sm={3} className="padding">
          {sidebar}
        </Col>
      </Row>
    </Container>
  )
}