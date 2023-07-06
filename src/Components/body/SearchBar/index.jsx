import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from 'react-redux';
import pokeSlice from '../../../reduxStore/pokeSlice';
import dexSlice from '../../../reduxStore/dexSlice';
import axios from 'axios';


function SearchBar (props) {
    const state = useSelector(state => state.pokemon)
    const settingsState = useSelector(state => state.settings)
    const dispatch = useDispatch();
    let { handleSearchInputChange, setPokemon } = pokeSlice.actions
    const { toggleIsLoading } = dexSlice.actions;
    

    const handleSearch = async (event) => {
      event.preventDefault();
      dispatch(toggleIsLoading(true))
      let foundPokemon = await axios(`${process.env.REACT_APP_SERVER}/pokemon/${state.searchInput}`);
      console.log('BYTE SIZE: ', foundPokemon)
      dispatch(setPokemon(foundPokemon.data.pokemon))
      dispatch(toggleIsLoading(false))
    }

    return(
      <Container>
        <InputGroup 
          onSubmit={handleSearch} 
          id='searchbar'
        >
          <Form.Control 
            id='search_input' 
            type="text" 
            placeholder='Search by name or id...' 
            onChange={(event) => dispatch(handleSearchInputChange(event.target.value.toLowerCase()))} />

          <Button 
            type='submit' 
            className={settingsState.theme}
            onClick={handleSearch} 
          >
            Search
          </Button>

        </InputGroup>
      </Container>
    )
}

export default SearchBar;