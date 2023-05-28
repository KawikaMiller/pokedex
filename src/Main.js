// dependencies
import React, { useState } from "react";
// bootstrap components
import Container from "react-bootstrap/Container";
// my components & classes
import SearchBar from "./SearchBar";
import Pokedex from "./search_display/Pokedex";
import { fetchPokemonData } from "./reduxStore/helperFuncs";
import { useDispatch, useSelector } from "react-redux";
import pokeSlice from './reduxStore/pokeSlice';



function Main (props){

  const [searchResult, setSearchResult] = useState(null);

  const state = useSelector(state => state.pokemon)
  const dispatch = useDispatch();
  let { setPokemon } = pokeSlice.actions

  const handleNextPokemon = (event) => {
    // console.log('next pokemon')
    if (state.pokemon.name) {
      dispatch(fetchPokemonData(event, state.pokemon.id + 1))
      .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
    } else {
      dispatch(fetchPokemonData(event, 1))
      .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
    }
  }

  const handlePreviousPokemon = (event) => {
    // console.log('prev pokemon')
    if (state.pokemon) {
      dispatch(fetchPokemonData(event, state.pokemon.id - 1))
      .then(response => {dispatch(setPokemon({pokemon: {...response}}))})      
    } else {
      dispatch(fetchPokemonData(event, 1))
      .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
    }
  }

  const handleNextGen = (event) => {
    // console.log('next generation')
    // if a search has been made and returned a result, then cycle up by generations
    if (searchResult) {
    // if you're viewing pokemon within gen 1, move to gen 2
      if (searchResult.id <= 151) {
        dispatch(fetchPokemonData(event, 152))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
    // if you're viewing pokemon within gen 2, move to gen 3 & etc.
      } else if (searchResult.id <= 251) {
        dispatch(fetchPokemonData(event, 252))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (searchResult.id <= 251) {
        dispatch(fetchPokemonData(event, 252))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})         
      } else if (searchResult.id <= 386) {
        dispatch(fetchPokemonData(event, 387))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (searchResult.id <= 493) {
        dispatch(fetchPokemonData(event, 494))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})                
      } else if (searchResult.id <= 649) {
        dispatch(fetchPokemonData(event, 650))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (searchResult.id <= 721) {
        dispatch(fetchPokemonData(event, 722))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (searchResult.id <= 809) {
        dispatch(fetchPokemonData(event, 810))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (searchResult.id <= 905) {
        dispatch(fetchPokemonData(event, 906))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (searchResult.id <= 906) {
        dispatch(fetchPokemonData(event, 1))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      }
    } else {fetchPokemonData(event, 1)}
  }

  const handlePreviousGen = (event) => {
    console.log('previous generation')
    // if a search has been made and returned a result, cycle back by generations
    if (searchResult) {
      // if within gen 9, move back to first starter of gen 8
      if (searchResult.id >= 906) {
        dispatch(fetchPokemonData(event, 810))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      // if within gen 8, move back to first starter of gen 7 & etc.
      } else if (searchResult.id >= 810) {
        dispatch(fetchPokemonData(event, 722))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (searchResult.id >= 722) {
        dispatch(fetchPokemonData(event, 650))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (searchResult.id >= 650) {
        dispatch(fetchPokemonData(event, 494))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (searchResult.id >= 494) {
        dispatch(fetchPokemonData(event, 387))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (searchResult.id >= 387) {
        dispatch(fetchPokemonData(event, 252))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (searchResult.id >= 252) {
        dispatch(fetchPokemonData(event, 152))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (searchResult.id >= 152) {
        dispatch(fetchPokemonData(event, 1))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (searchResult.id >= 1) {
        dispatch(fetchPokemonData(event, 906))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      }
    // if no search has been made, move to gen 9
    } else {
      dispatch(fetchPokemonData(event, 906))
      .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
    }
  }

    return(
      <Container>
        <SearchBar />
        <Pokedex 
          handleNextPokemon={handleNextPokemon}
          handlePreviousPokemon={handlePreviousPokemon}
          handleNextGen={handleNextGen}
          handlePreviousGen={handlePreviousGen}
        />
      </Container>
    )
}

export default Main;