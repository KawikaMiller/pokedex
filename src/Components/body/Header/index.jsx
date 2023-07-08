import React from 'react'

// import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { useSelector, useDispatch } from 'react-redux';
import settingsSlice from '../../../reduxStore/settingsSlice';

import UserDropdown from '../User';

// import { useAuth0 } from '@auth0/auth0-react';

function Header (props) {

  const dispatch = useDispatch();
  const settingsState = useSelector(state => state.settings);
  const { setTheme } = settingsSlice.actions;

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme))
  }

  return(
    <>
      <section id='header' className={settingsState.theme} /*onClick={this.props.transitionHeader}*/ >
        <Navbar>
          <Nav id='nav_left'>
            <Navbar.Brand>Pokedex App</Navbar.Brand>
            <Nav.Link className={settingsState.theme}>Home</Nav.Link>
            <Nav.Link className={settingsState.theme}>About</Nav.Link>
            <NavDropdown title='Theme' className={settingsState.theme}>
              <NavDropdown.Item onClick={() => handleThemeChange('pokeball')}>Pokeball</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleThemeChange('greatball')}>Greatball</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleThemeChange('ultraball')}>Ultraball</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleThemeChange('masterball')}>Masterball</NavDropdown.Item>
            </NavDropdown>
          </Nav>            
          <div id='nav_right'>
            <UserDropdown />
          </div>
        </Navbar>
        <div id='pokeball_button_outer'></div>
      </section>
    </>
  )
}

export default Header;