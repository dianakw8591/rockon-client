import React from 'react'
import { Navbar, Nav, Button, NavDropdown, Col } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

export default function NavBar(props) {
  const { authUser, signupForm, switchForm, handleLogout } = props;

  return (
    <Navbar bg="light" variant="light" >
      <Navbar.Brand>
        {authUser.id ? <Link to="/dashboard/stats"><h1>RockOn</h1></Link> : <Link to="/"><h1>RockOn</h1></Link>}
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
            <NavDropdown title={authUser.username} >
              <NavDropdown.Item as={NavLink} to='/account' exact>Account</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout} as={NavLink} to='/' exact>Logout</NavDropdown.Item>
            </NavDropdown>
          </>
        ) :
          <LinkContainer to="/">
            <Button variant="outline-primary" className="mr-sm-2" onClick={switchForm}> {signupForm ? 'Log In' : 'Sign Up'}</Button>
          </LinkContainer>
        }

        {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-primary">Search</Button>
    </Form> */}
      </Col>
    </Navbar>
  )
}