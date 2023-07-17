import React from 'react'
import Modal from 'react-bootstrap/Modal'

import Login from '../Login'

import { useSelector } from 'react-redux'

function UserAuthModal (props){

  const settingsState = useSelector(state => state.settings)

  return(
    <Modal show={props.showModal} onHide={props.toggleModal} centered>
      <Modal.Header className={settingsState.theme}>
        {props.modalType === 'login' ? 'Please Log In' : 'Create an Account'}
      </Modal.Header>
      <Modal.Body className={settingsState.theme}>
        <Login modalType={props.modalType} toggleModal={props.toggleModal}/>        
      </Modal.Body>
      <Modal.Footer className={settingsState.theme}></Modal.Footer>
    </Modal>
  )

}

export default UserAuthModal;