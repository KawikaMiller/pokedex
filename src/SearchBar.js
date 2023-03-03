import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
// import axios from 'axios';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      searchResult: null,
      error: null,
    }
  }

  render() {
    return(
      <Container>
        <Form style={{display:'flex'}}>
          <Form.Control type="text" placeholder='Search...' onChange={this.props.handleInputChange} />
          <Button type='submit' variant="primary" onClick={this.props.handleSearch} onSubmit={this.props.handleSearch} >Search</Button>
        </Form>
      </Container>
    )
  }
}

export default SearchBar;