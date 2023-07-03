import React from 'react'
import Modal from 'react-bootstrap/Modal'

import Login from '../Login'

function UserAuthModal (props){

  return(
    <Modal show={props.showModal} onHide={props.toggleModal} centered>
      <Modal.Header>
        {props.modalType === 'login' ? 'Please Log In' : 'Create an Account'}
      </Modal.Header>
      <Modal.Body>
        <Login modalType={props.modalType} toggleModal={props.toggleModal}/>        
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  )

}

export default UserAuthModal;