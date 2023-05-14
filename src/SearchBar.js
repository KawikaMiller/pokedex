import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
// import axios from 'axios';


function SearchBar (props) {
    return(
      <Container>
        <Form onSubmit={props.handleSearch} style={{display:'flex'}}>
          <Form.Control id='search_input' type="text" placeholder='Search by name or id...' onChange={props.handleInputChange} />
          <Button type='submit' variant="primary" onClick={props.handleSearch} >Search</Button>
        </Form>
      </Container>
    )
}

export default SearchBar;