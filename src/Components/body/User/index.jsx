import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserAuthModal from "../../forms/modals/UserAuth";

import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import userSlice from "../../../reduxStore/userSlice";
import { useSelector, useDispatch } from "react-redux";

function UserDropdown(){
  
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const settingsState = useSelector(state => state.settings);
  const { userLogout, userLogin } = userSlice.actions

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
      .catch(err => console.err('Unable to logout at this time, please try again.', err))
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
      {
        userState.isLoggedIn ? 
        <>
          <Dropdown>

            <Dropdown.Toggle 
              id='user_dropdown_menu' 
              variant="light-primary"
            >
              <Image roundedCircle={true} src="https://placehold.co/50"/>
              {/* {userState.username} */}
            </Dropdown.Toggle>

            <Dropdown.Menu align={'end'}>
              <Dropdown.Item>{userState.username}</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Account</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button className={settingsState.theme} onClick={handleLogout}>Log Out</Button>                  
              </Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>
        </>
        : 
        <div id='login_signup'>
          <Button className={settingsState.theme} onClick={() => toggleModal('login')}>Log In</Button>
          <Button className={settingsState.theme} onClick={() => toggleModal('signup')}>Sign Up</Button>              
        </div>
      }

      <UserAuthModal showModal={showModal} modalType={modalType} toggleModal={toggleModal} />
    </>
  )
}

export default UserDropdown;