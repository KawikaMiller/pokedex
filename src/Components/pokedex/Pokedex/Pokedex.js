import React from "react";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
// react components
import RightCard from "../RightCard/RightCard";
import PokemonDisplay from "../Display/PokemonDisplay";
import BaseStats from "../BaseStats/BaseStats";
//redux
import { useSelector, useDispatch } from "react-redux";
import pokeSlice from "../../../reduxStore/pokeSlice";
import { fetchPokemon, supplementMoveData, fetchTypeEffectiveness, fetchPokedexEntries, fetchAbilityDescriptions } from "../../../reduxStore/helperFuncs";

function Pokedex (props) {
  const state = useSelector(state => state.pokemon)
  const dispatch = useDispatch();
  let { toggleShiny, changeFormIdx, setPokemon } = pokeSlice.actions


  const handleToggleShiny = () => {
    dispatch(toggleShiny(!state.showShiny))
  }

  const handleToggleForm = () => {
    let newApiIdx = state.formIdx + 1;
    if (newApiIdx >= state.pokemon.forms.length) {
      newApiIdx = 0;
    }
    dispatch(changeFormIdx(newApiIdx))
  }

  const handleAdjacentPokemon = (event, int) => {
    dispatch(changeFormIdx(0));
    if (state.pokemon.name) {
      dispatch(fetchPokemon(event, state.pokemon.id + int))
      .then(response => dispatch(supplementMoveData(response)))
      .then(response => dispatch(fetchTypeEffectiveness(response)))
      .then(response => dispatch(fetchPokedexEntries(response)))
      .then(response => dispatch(fetchAbilityDescriptions(response)))
      .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
    } else {
      dispatch(fetchPokemon(event, 1))
      .then(response => dispatch(supplementMoveData(response)))
      .then(response => dispatch(fetchTypeEffectiveness(response)))
      .then(response => dispatch(fetchPokedexEntries(response)))
      .then(response => dispatch(fetchAbilityDescriptions(response)))
      .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
    }
  }

  const handleNextGen = (event) => {
    // console.log('next generation')
    // if a search has been made and returned a result, then cycle up by generations
    if (state.pokemon) {
    // if you're viewing pokemon within gen 1, move to gen 2
      if (state.pokemon.id <= 151) {
        dispatch(fetchPokemon(event, 152))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
    // if you're viewing pokemon within gen 2, move to gen 3 & etc.
      } else if (state.pokemon.id <= 251) {
        dispatch(fetchPokemon(event, 252))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (state.pokemon.id <= 251) {
        dispatch(fetchPokemon(event, 252))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})         
      } else if (state.pokemon.id <= 386) {
        dispatch(fetchPokemon(event, 387))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (state.pokemon.id <= 493) {
        dispatch(fetchPokemon(event, 494))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})                
      } else if (state.pokemon.id <= 649) {
        dispatch(fetchPokemon(event, 650))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (state.pokemon.id <= 721) {
        dispatch(fetchPokemon(event, 722))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (state.pokemon.id <= 809) {
        dispatch(fetchPokemon(event, 810))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (state.pokemon.id <= 905) {
        dispatch(fetchPokemon(event, 906))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      } else if (state.pokemon.id <= 906) {
        dispatch(fetchPokemon(event, 1))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})        
      }
    } else {fetchPokemon(event, 1)}
  }

  const handlePreviousGen = (event) => {
    console.log('previous generation')
    // if a search has been made and returned a result, cycle back by generations
    if (state.pokemon) {
      // if within gen 9, move back to first starter of gen 8
      if (state.pokemon.id >= 906) {
        dispatch(fetchPokemon(event, 810))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      // if within gen 8, move back to first starter of gen 7 & etc.
      } else if (state.pokemon.id >= 810) {
        dispatch(fetchPokemon(event, 722))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (state.pokemon.id >= 722) {
        dispatch(fetchPokemon(event, 650))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (state.pokemon.id >= 650) {
        dispatch(fetchPokemon(event, 494))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (state.pokemon.id >= 494) {
        dispatch(fetchPokemon(event, 387))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (state.pokemon.id >= 387) {
        dispatch(fetchPokemon(event, 252))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (state.pokemon.id >= 252) {
        dispatch(fetchPokemon(event, 152))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (state.pokemon.id >= 152) {
        dispatch(fetchPokemon(event, 1))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      } else if (state.pokemon.id >= 1) {
        dispatch(fetchPokemon(event, 906))
        .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
      }
    // if no search has been made, move to gen 9
    } else {
      dispatch(fetchPokemon(event, 906))
      .then(response => {dispatch(setPokemon({pokemon: {...response}}))})
    }
  }

  return (
    <Container id='pokedex-container'>
      
      <CardGroup id='pokedex' >

        {/* left side card */}
        <Card bg='danger'>
          <Card.Header>
            {/* pokedex lights */}
            <div id="light-container">
              <div id="blue-light"></div>
              <div id="red-light"></div>
              <div id="yellow-light"></div>
              <div id="green-light"></div>
            </div>
          </Card.Header>

          <Card.Body>
            {/* displays pokemon picture */}
            <Container id='pokedex-display-border'>
              <Container id='pokedex-display'>
                {state.pokemon ?
                  <PokemonDisplay 
                    key={`${state.pokemon.name}_display`}
                  /> 
                  : null
                }
              </Container>
            </Container>

            <Container id='pokedex-bottom-ui'>
              
              <Container id='bottom-ui-circlebutton'>
                <Container id='circlebutton' onClick={() => {
                  let audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${state.pokemon.name.toLowerCase()}.mp3`);
                  audio.volume = 0.1;
                  audio.play();
                }}>                   
                </Container>
              </Container>

              <Container id='bottom-ui-center'>

                <Container id='bottom-ui-red-blue'>
                  <Button variant="success" onClick={handleToggleForm}></Button>
                  <Button onClick={handleToggleShiny}></Button>
                </Container>

                <Container id='bottom-ui-pokedex-info'>
                  {/* displays pokemon base stats */}
                  <BaseStats 
                      key={`${state.pokemon?.name}_basestats`}
                  />
                </Container>     

              </Container>

              <Container id='bottom-ui-dpad'>
                  <div id='dpad-up' onClick={handleNextGen}></div>
                  <div id='dpad-left' onClick={(event) => handleAdjacentPokemon(event, -1)}></div>
                  <div id='dpad-center'></div>
                  <div id='dpad-right' onClick={(event) => handleAdjacentPokemon(event, 1)}></div>
                  <div id='dpad-down' onClick={handlePreviousGen}></div>
              </Container>

            </Container>
          </Card.Body>
        </Card>
        
        <RightCard />

      </CardGroup>
    </Container>
    
  )
}

export default Pokedex;