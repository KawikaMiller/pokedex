import React from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

import axios from "axios";

function Login ({isLoggedIn}) {

  const handleLogin = (event) => {
    event.preventDefault();

    // console.log(event)
    axios
      .post(`${process.env.REACT_APP_SERVER}/login`, {
        username: event.target[0].value,
        password: event.target[1].value
      })
      .then(response => console.log(response))
  }

  const handleLogout = () => {

  }

  const handleSignUp = (event) => {
    axios
    .post(`${process.env.REACT_APP_SERVER}/signup`, {
      username: event.target.form[0].value,
      password: event.target.form[1].value
    })
    .then(response => console.log(response))
  }

  return(
    <>
      {isLoggedIn ?
        <Button onClick={handleLogout}>Log Out</Button>
      :
        <div >
          <Form
            onSubmit={handleLogin}
          >
            <Form.Control 
              type='text'
              id='username'
              placeholder='Username'
              min={5} max={15}
              size='sm'
            />
            <Form.Control 
              type='password'
              id='password'
              placeholder='Password'
              min={5} max={15}
              size='sm'
            />
            <section style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button type="submit">Log In</Button>
              <Button onClick={handleSignUp}>Sign Up</Button>              
            </section>
          </Form>
        </div>
      }
    </>
  )

}

export default Login;