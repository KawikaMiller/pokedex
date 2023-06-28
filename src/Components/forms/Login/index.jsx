import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from "axios";
import base64 from 'base-64';

import { useDispatch } from "react-redux";
import userSlice from "../../../reduxStore/userSlice";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import '../../../css/forms.css'

function Login (props) {

  const [userIsTaken, setUserIsTaken] = useState(false);
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const dispatch = useDispatch();
  let { userLogin } = userSlice.actions;

  const handleLogin = (event) => {
    event.preventDefault();
    let credentials = base64.encode(`${event.target.username.value}:${event.target.password.value}`)
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
        }));
        props.toggleModal();
      })
      .catch(err => {
        setIsInvalidCredentials(!isInvalidCredentials)
        console.error(err);
      })
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    let credentials = base64.encode(`${event.target.username.value}:${event.target.password.value}`)
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
        }));
        props.toggleModal();
      }
    })
    .catch(err => {
      console.err(err)
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return(
    <div >
      <Form
        onSubmit={props.modalType === 'login' ? handleLogin : handleSignUp}
      >
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type='text'
          id='username'
          placeholder='Username'
          minLength='3'
          maxLength='20'
          size='sm'
        />
        <br></br>
        <Form.Label>Password</Form.Label>
        <InputGroup className='passwordFocus' >
          <Form.Control 
            type={showPassword ? 'text' : 'password'}
            id='password'
            placeholder='Password'
            minLength='3'
            maxLength='20'
            size='sm'
            onFocus={() => setPasswordFocus(!passwordFocus)}
          />     
          <Button size='sm' style={{width:'10%'}} onClick={togglePasswordVisibility} >
            <FontAwesomeIcon  
              icon={showPassword ? faEye : faEyeSlash}
            />
          </Button>   
        </InputGroup>           
        <br></br>

        {props.modalType === 'signup' ? 
          <>
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup >
              <Form.Control 
                type={showPassword ? 'text' : 'password'}
                id='passwordCheck'
                placeholder='Password'
                minLength='3'
                maxLength='20'
                size='sm'
              />     
              <Button size='sm' style={{width:'10%'}} onClick={togglePasswordVisibility}>
                <FontAwesomeIcon  
                  icon={showPassword ? faEye : faEyeSlash}
                />
              </Button>   
            </InputGroup>           
            <br></br>
          </>
        : 
          null
        }

        <section style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button type='submit'>{props.modalType === 'login' ? 'Log In' : 'Sign Up'}</Button>
          {isInvalidCredentials ? 
          <section>
            <Form.Text>Invalid username or password</Form.Text>
          </section>
          :
            null
          }
          {userIsTaken ? 
          <section>
            <Form.Text>Username is already taken</Form.Text>
          </section> 
          : 
            null
          }
        </section>

      </Form>
    </div>
  )

}

export default Login;