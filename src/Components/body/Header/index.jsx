import React, { useState, useEffect } from 'react'

// import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import UserAuthModal from '../../forms/modals/UserAuth';
import userSlice from '../../../reduxStore/userSlice';
import settingsSlice from '../../../reduxStore/settingsSlice';

// import { useAuth0 } from '@auth0/auth0-react';

function Header (props) {

  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const settingsState = useSelector(state => state.settings);
  const { userLogout, userLogin } = userSlice.actions
  const { setTheme } = settingsSlice.actions;

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(undefined);


  const toggleModal = (modalType = undefined) => {
    setShowModal(!showModal);
    setModalType(modalType)
  }

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/logout`, {}, {
        withCredentials: true,
        credentials: 'include'
      })
      .then(() => {
        dispatch(userLogout());        
      })
      .catch(err => console.err('Unable to logout at this time, please try again.'))
  }

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme))
  }

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/reauthenticate`, {}, {
        withCredentials: true,
        credentials: 'include'
      })
      .then(response => {
        if(response.data){
          dispatch(userLogin({
            username: response.data.username,
            id: response.data._id
          }))
        }
      })
  },[])//eslint-disable-line

  return(
    <>
      <section id='header' className={settingsState.theme} /*onClick={this.props.transitionHeader}*/ >
        <Navbar>
          <Nav id='nav_left'>
            <Navbar.Brand>Pokedex App</Navbar.Brand>
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>About</Nav.Link>
            <Nav.Link disabled>Account</Nav.Link>
            <NavDropdown title='Theme'>
              <NavDropdown.Item onClick={() => handleThemeChange('pokeball')}>Pokeball</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleThemeChange('greatball')}>Greatball</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleThemeChange('ultraball')}>Ultraball</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleThemeChange('masterball')}>Masterball</NavDropdown.Item>
            </NavDropdown>
          </Nav>            
          <div>
            {
              userState.isLoggedIn ? 
              <>
                <p>{`Welcome, ${userState.username}!`}</p>
                <Button className={settingsState.theme} onClick={handleLogout}>Log Out</Button>        
              </>
              : 
              <>
                <Button className={settingsState.theme} onClick={() => toggleModal('login')}>Log In</Button>
                <Button className={settingsState.theme} onClick={() => toggleModal('signup')}>Sign Up</Button>              
              </>
            }
          </div>
        </Navbar>
        <div id='pokeball_button_outer'></div>
      </section>

      <UserAuthModal showModal={showModal} modalType={modalType} toggleModal={toggleModal} />
    </>
  )
}

export default Header;