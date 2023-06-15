import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

import axios from "axios";
import base64 from 'base-64';

import { useSelector, useDispatch } from "react-redux";
import userSlice from "../../reduxStore/userSlice";

function Login ({isLoggedIn}) {

  const [userIsTaken, setUserIsTaken] = useState(false);
  const userState = useSelector(state => state.user);
  const dispatch = useDispatch();
  let {userLogin, userLogout} = userSlice.actions;

  const handleLogin = (event) => {
    event.preventDefault();
    let credentials = base64.encode(`${event.target[0].value}:${event.target[1].value}`)
    axios
      .post(`${process.env.REACT_APP_SERVER}/login`, {}, {
        headers: {'Authorization': `Basic ${credentials}`},
        withCredentials: true,
        credentials: 'include'
      })
      .then(response => {
        dispatch(userLogin({
          username: response.data.user.username,
          id: response.data.user._id
        }))
      })
  }

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const handleSignUp = (event) => {
    let credentials = base64.encode(`${event.target.form[0].value}:${event.target.form[1].value}`)
    axios
    .post(`${process.env.REACT_APP_SERVER}/signup`, {credentials}, {
      withCredentials: true,
      credentials: 'include'
    })
    .then(response => {
      if (response.status === 205){
        setUserIsTaken(true)
      } else {
        setUserIsTaken(false);
        dispatch(userLogin({
          username: response.data.user,
          id: response.data._id
        }))
      }
    })
  }

  return(
    <>
      {isLoggedIn ?
        <>
          <p>{`Welcome, ${userState.username}!`}</p>
          <Button onClick={handleLogout}>Log Out</Button>        
        </>

      :
        <div >
          <Form
            onSubmit={handleLogin}
          >
            <section style={{display: 'flex'}}>
              <Form.Control 
                type='text'
                id='username'
                placeholder='Username'
                minLength='3'
                maxLength='20'
                size='sm'
              />
              <Form.Control 
                type='password'
                id='password'
                placeholder='Password'
                minLength='3'
                maxLength='20'
                size='sm'
              />              
            </section>
            {userIsTaken ? 
              <section>
                <Form.Text>Username is already taken</Form.Text>
              </section> 
            : 
              null
            }
            <section style={{display: 'flex', justifyContent: 'space-evenly'}}>
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