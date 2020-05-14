import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import monster from '../assets/monster.png';

export default function About() {

  const sectionStyle = {
    position: 'fixed',
    backgroundImage: `url(${monster})`,
    minHeight: '1000px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '370px',
    height: 'auto',
    top: '80px',
    right: '0px',
    zIndex: '-1',
  };

  const footerStyle = {
    fontSize: '12px',
    position: 'fixed',
    left: '0',
    bottom: '-8px',
    width: '100%',
    textAlign: 'center',
    paddingLeft: `32px`,
  };
  return (
    <div className='padding'>
      <div style={sectionStyle}></div>
      <Container>
        <Row>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Text>
                  RockOn is a digital logbook for recording climbing ascents and attempts. RockOn utilizes Mountain Project's API to access a database of climbs, and then allows the user to create an entry connected to a climb. Using information associated with the climb (such as grade) combined with user entered tags such as the style of the ascent (lead, follow, etc) and outcome (redpoint, flash, etc), a user's climbing story is displayed graphically and easily filtered.
                </Card.Text>
                <Card.Text>
                  Inspired by the years of climbing journals I have at home, RockOn is specifically designed for recording information related to climbing and displaying a visual story of that history. It is also a work in progress and I welcome any feedback! Thanks for using!
                </Card.Text>
                <Card.Text>
                  {'-Diana Wendt, '}
                  {/* <a href=https://www.linkedin.com/in/diana-wendt-360b49123/ target="_blank" rel="noopener noreferrer">
                  </a> */}
                  <a href="mailto:RockOnApp2020@gmail.com">RockOnApp2020@gmail.com</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <div style={footerStyle}>
        <p className="font-italic">Upper 2/3 of 'The Monster'...    Art by
          <a href='https://gutzjourney.com/' target="_blank" rel="noopener noreferrer"> Natalie Brechtel</a>
        </p>
      </div>
    </div>
  )
}