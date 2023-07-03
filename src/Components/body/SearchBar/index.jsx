import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import { useDispatch } from 'react-redux';
import pokeSlice from '../../../reduxStore/pokeSlice';
import dexSlice from '../../../reduxStore/dexSlice';
import axios from 'axios';


function SearchBar (props) {
    const dispatch = useDispatch();
    let { handleSearchInputChange, setPokemon } = pokeSlice.actions
    const { toggleIsLoading } = dexSlice.actions;
    

    const handleSearch = async (event) => {
      event.preventDefault();
      dispatch(toggleIsLoading(true))
      let foundPokemon = await axios(`${process.env.REACT_APP_SERVER}/test`);
      console.log('BYTE SIZE: ', foundPokemon)
      dispatch(setPokemon(foundPokemon.data.pokemon))
      dispatch(toggleIsLoading(false))
    }

    return(
      <Container>
        <Form 
          onSubmit={handleSearch} 
          style={{display:'flex'}}
        >
          <Form.Control 
            id='search_input' 
            type="text" 
            placeholder='Search by name or id...' 
            onChange={(event) => dispatch(handleSearchInputChange(event.target.value.toLowerCase()))} />

          <Button 
            type='submit' 
            variant="primary" 
            onClick={handleSearch} 
          >
            Search
          </Button>

        </Form>
      </Container>
    )
}

export default SearchBar;