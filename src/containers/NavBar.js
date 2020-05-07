import React from 'react';
import { Navbar, Nav, Button, NavDropdown, Col } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import logo from '../assets/logo.png';

export default function NavBar(props) {
  const { authUser, signupForm, switchForm, handleLogout } = props;

  return (
    <Navbar variant="light" style={{backgroundColor: "rgba(63, 81, 181, 0.18"}}>
      <Navbar.Brand >
        <Link to={authUser.id ? "/dashboard/stats" : "/"} className='text-decoration-none'>    
        <img
        src={logo}
        width="auto"
        height="50"
        className="d-inline-block align-top"
        alt="RockOn logo"
      /></Link>
      </Navbar.Brand>
      <Col>
        <Nav className="mr-auto">
          <Link className='nav-link' to='/about'>About</Link>
          {authUser.id ? (
            <>
              <Link className='nav-link' to='/dashboard/stats'>Dashboard</Link>
              <Link className='nav-link' to='/dashboard/log'>Logbook</Link>
            </>
          ) : null}
        </Nav>
      </Col>
      <Col className="d-flex justify-content-end">
        {authUser.id ? (
          <>
            <LinkContainer to="/dashboard/log">
              <Button variant="outline-primary" className="mr-sm-2"> Log a Climb </Button>
            </LinkContainer>
            <NavDropdown title={authUser.username} variant='light'>
              <NavDropdown.Item as={NavLink} to='/account' exact >Account</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/dashboard/onboard' exact >How To</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout} as={NavLink} to='/' exact>Logout</NavDropdown.Item>
            </NavDropdown>
          </>
        ) :
          <LinkContainer to="/">
            <Button variant="outline-primary" className="mr-sm-2" onClick={switchForm}> {signupForm ? 'Log In' : 'Sign Up'}</Button>
          </LinkContainer>
        }
      </Col>
    </Navbar>
  )
}