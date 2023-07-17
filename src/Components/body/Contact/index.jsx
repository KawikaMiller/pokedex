import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Form from 'react-bootstrap/Form';
import { Button, Container, Spinner, Toast, ToastContainer } from "react-bootstrap";

function Contact(){

  const settingsState = useSelector(state => state.settings);

  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Default Message');
  const [toastVariant, setToastVariant] = useState('success');

  const handleToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      setIsSending(true);
      let response = await axios.post(`${process.env.REACT_APP_EMAIL_SERVER}/email`, {
        senderName: event.target.name.value,
        senderEmail: event.target.email.value,
        subject: event.target.subject.value,
        message: event.target.message.value,
      });
      setIsSending(false);
      handleToast('Email successfully sent!', 'success');
      console.log(response);
    }
    catch(e){
      setIsSending(false);
      handleToast('Error sending email - please try again.', 'danger')
    }
  }

  return(
    <Container id='contact'>

      <h1>Contact Me!</h1>
      <br/>
      <Form onSubmit={handleSubmit}>
        <div id='contact_details'>
          <Form.Group className="form_group">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type='text' id='name' placeholder='Professor Oak' />
          </Form.Group>

          <Form.Group className="form_group">
            <Form.Label>Email Address</Form.Label> 
            <Form.Control type='email' id='email' placeholder='oak@pallettown.com' />
          </Form.Group>
        </div>

        <br/>
        <Form.Group className="form_group">
          <Form.Label>Subject</Form.Label> 
          <Form.Control type='text' id='subject' placeholder='I found a new bug!' />
        </Form.Group>

        <br/>
        <Form.Group className="form_group">
          <Form.Label>Message</Form.Label> 
          <Form.Control as='textarea' rows={7} id='message' placeholder='I was walking through viridian forest when...'  />          
        </Form.Group>
        <br/>
        <Button type='submit' className={settingsState.theme} disabled={isSending ? true : false}>
          {isSending ? <Spinner animation="border" role="status" size='sm'/> : 'Send'}
        </Button>
        {isSending ? <p>Please be patient, it may take a while for the email server to spin up if it's been inactive</p> : <p style={{visibility:'hidden'}}>here for consistency</p>}
      </Form>

      <ToastContainer position={'bottom-center'}>
        <Toast bg={toastVariant} autohide delay={4000} show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Body>
            {toastMessage}
          </Toast.Body>
        </Toast>        
      </ToastContainer>

    </Container>
  )

}

export default Contact;