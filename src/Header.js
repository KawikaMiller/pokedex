import React, { useState } from 'react'
import axios from 'axios';

// import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

// import { useAuth0 } from '@auth0/auth0-react';

function Header (props) {

  const handleLogin = async () => {
    let response = await axios.get(`http://localhost:3001/login`, {headers: {'Access-Control-Allow-Origin': 'http://localhost:3000/' }});
    console.log(response);
  }

 
  return(
    <section id='header' /*onClick={this.props.transitionHeader}*/ >
      <Navbar>
        <Nav id='nav_left'>
          <Navbar.Brand>Pokedex App</Navbar.Brand>
          <Nav.Link>Home</Nav.Link>
          <Nav.Link>About</Nav.Link>
          <NavDropdown title='Account'>
            <NavDropdown.Item>My Account</NavDropdown.Item>
            <NavDropdown.Item>Theme</NavDropdown.Item>
          </NavDropdown>
        </Nav>            
        <div>
          <Button onClick={handleLogin} style={{zIndex:5,}}>Log In</Button>
        </div>
      </Navbar>
      <div id='pokeball_button_outer'></div>
    </section>
  )
}

export default Header;