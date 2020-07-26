import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import logo from '.././mintbean.png';

const MintNav = () => {
  return (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <img
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
      {' '}
      Mintbean
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href="#link">CareerHack 7-27</Nav.Link>
    <Nav.Link href="#link">Repo</Nav.Link>
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default MintNav
