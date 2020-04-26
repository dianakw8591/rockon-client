import React, { useState } from 'react'
import { Nav, Navbar, NavItem, Button, NavDropdown } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"

export default function NavBar(props) {
  const { authUser, signupForm, switchForm, handleLogout } = props;

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand>
        {authUser ? <Link to="/dashboard"><h1>RockOn</h1></Link> : <Link to="/"><h1>RockOn</h1></Link>}
      </Navbar.Brand>
      {authUser ? (
        <>
          <LinkContainer to="/logbook">
            <Button variant="outline-primary" className="mr-sm-2"> Log a Climb </Button>
          </LinkContainer>
          <NavDropdown title={authUser.username} >
              <NavDropdown.Item as={NavLink} to='/account' exact>Account</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout} as={NavLink} to='/' exact>Logout</NavDropdown.Item>
          </NavDropdown>
        </>
      ) :
        <Button variant="outline-primary" className="mr-sm-2" onClick={switchForm}> {signupForm ? 'Log In' : 'Sign Up'}</Button>
      }


      {/* <Nav pullRight>
        
        <LinkContainer to="/login">
        <NavItem>Login</NavItem>
        </LinkContainer>
      </Nav> */}
      {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-primary">Search</Button>
    </Form> */}

    </Navbar>
  )
}