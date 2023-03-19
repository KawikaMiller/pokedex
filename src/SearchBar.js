import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
// import axios from 'axios';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  // handleSubmitForm = (event) => {
  //   event.preventDefault();
  //   this.props.handleSearch(event);
  //   console.log(document.getElementById('search_input'))
  //   document.getElementById('search_input').value = '';
  // }

  render() {
    return(
      <Container>
        <Form onSubmit={this.props.handleSearch} style={{display:'flex'}}>
          <Form.Control id='search_input' type="text" placeholder='Search by name or id...' onChange={this.props.handleInputChange} />
          <Button type='submit' variant="primary" onClick={this.props.handleSearch} >Search</Button>
        </Form>
      </Container>
    )
  }
}

export default SearchBar;