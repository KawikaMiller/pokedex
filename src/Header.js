import React from 'react'

// import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

class Header extends React.Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render(){
    return(
      <section id='header' onClick={this.props.transitionHeader}>
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
            <Button>Log In</Button>
          </div>
        </Navbar>
        <div id='pokeball_button_outer'></div>
      </section>
    )
  }
}

export default Header;