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

// import { useAuth0 } from '@auth0/auth0-react';

function Header (props) {

  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  let { userLogout, userLogin } = userSlice.actions

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
      <section id='header' /*onClick={this.props.transitionHeader}*/ >
        <Navbar>
          <Nav id='nav_left'>
            <Navbar.Brand>Pokedex App</Navbar.Brand>
            <Nav.Link onClick={() => {
              axios.get(`${process.env.REACT_APP_SERVER}/test`)
              .then(res => console.log(res))
            }}>Home</Nav.Link>
            <Nav.Link>About</Nav.Link>
            <NavDropdown title='Account'>
              <NavDropdown.Item>My Account</NavDropdown.Item>
              <NavDropdown.Item>Theme</NavDropdown.Item>
            </NavDropdown>
          </Nav>            
          <div>
            {
              userState.isLoggedIn ? 
              <>
                <p>{`Welcome, ${userState.username}!`}</p>
                <Button onClick={handleLogout}>Log Out</Button>        
              </>
              : 
              <>
                <Button onClick={() => toggleModal('login')}>Log In</Button>
                <Button onClick={() => toggleModal('signup')}>Sign Up</Button>              
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