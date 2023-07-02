import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from 'react-redux';
import pokeSlice from '../../../reduxStore/pokeSlice';
import axios from 'axios';


function SearchBar (props) {
    const state = useSelector(state => state.pokemon)
    const dispatch = useDispatch();
    let { handleSearchInputChange, setPokemon } = pokeSlice.actions

    const handleSearch = async (event) => {
      event.preventDefault();
      let foundPokemon = await axios(`${process.env.REACT_APP_SERVER}/pokemon/${state.searchInput}`);
      dispatch(setPokemon(foundPokemon.data.pokemon))
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