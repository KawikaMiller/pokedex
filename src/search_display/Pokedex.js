import React, { useState, useEffect } from "react";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
// react components
import RightCard from "../RightCard";
import PokemonDisplay from "./PokemonDisplay";
import BaseStats from "./BaseStats";
//redux
import { useSelector, useDispatch } from "react-redux";
import pokeSlice from "../reduxStore/pokeSlice";

function Pokedex (props) {
  const state = useSelector(state => state.pokemon)
  const dispatch = useDispatch();
  let { toggleShiny } = pokeSlice.actions

  // const [toggleShiny, setToggleShiny] = useState(props.handleShinyToggle);
  const [toggleForm, setToggleForm] = useState(false);
  const [formApiId, setFormApiId] = useState(null);
  const [formIdx, setFormIdx] = useState(0);

  const handleToggleShiny = () => {
    // setToggleShiny(!toggleShiny)
    dispatch(toggleShiny(!state.showShiny))
  }

  const handleToggleForm = () => {
    let newApiIdx = formIdx + 1;
    if (newApiIdx >= state.pokemon.forms.length) {
      newApiIdx = 0;
    }
    setFormIdx(newApiIdx)
  }


  // 'componentDidMount'
  useEffect(() => {
    // old code, keeping for recordkeeping / just in case
    // setSearchResult(props.searchResult)
  }, 
  [])


  // 'componentDidUpdate'
  useEffect(() => {
    // old code, keeping for recordkeeping / just in case
    // setSearchResult(props.searchResult);
    // setFormIdx(0);
  }, 
  [props])




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
                    name={state.pokemon.name}
                    id={state.pokemon.forms[formIdx].apiId}
                    formIdx={formIdx} 
                    sprites={state.pokemon.sprites} 
                    key={`${state.pokemon.name}_display`}
                    toggleShiny={toggleShiny} 
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
                  {state.pokemon ? 
                    <BaseStats 
                      stats={state.pokemon.stats} 
                      key={`${state.pokemon.name}_basestats`}
                    />
                    :
                    <BaseStats
                      stats={
                        [
                          {name: 'HP', base_stat: undefined},
                          {name: 'ATK', base_stat: undefined},
                          {name: 'DEF', base_stat: undefined},
                          {name: 'SP.ATK', base_stat: undefined},
                          {name: 'SP.DEF', base_stat: undefined},
                          {name: 'SPD', base_stat: undefined}
                        ]
                      }
                      key={`placeholder_basestats`}
                    />
                  }
                </Container>     

              </Container>

              <Container id='bottom-ui-dpad'>
                  <div id='dpad-up' onClick={props.handleNextGen}></div>
                  <div id='dpad-left' onClick={props.handlePreviousPokemon}></div>
                  <div id='dpad-center'></div>
                  <div id='dpad-right' onClick={props.handleNextPokemon}></div>
                  <div id='dpad-down' onClick={props.handlePreviousGen}></div>
              </Container>

            </Container>
          </Card.Body>
        </Card>
        
        {/* right side card */}
        <RightCard searchResult={state.pokemon}/>

      </CardGroup>
    </Container>
    
  )
}

export default Pokedex;