import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from 'react-redux';
import pokeSlice from './reduxStore/pokeSlice';
import { fetchPokemon, supplementMoveData, fetchTypeEffectiveness, fetchPokedexEntries,fetchAbilityDescriptions,  } from './reduxStore/helperFuncs';
// import axios from 'axios';


function SearchBar (props) {
    const state = useSelector(state => state.pokemon)
    const dispatch = useDispatch();
    let { handleSearchInputChange, setPokemon } = pokeSlice.actions

    const handleSearch = (event) => {
      dispatch(fetchPokemon(event, state.searchInput))
      .then(response => dispatch(supplementMoveData(response)))
      .then(response => dispatch(fetchTypeEffectiveness(response)))
      .then(response => dispatch(fetchPokedexEntries(response)))
      .then(response => dispatch(fetchAbilityDescriptions(response)))
      .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
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