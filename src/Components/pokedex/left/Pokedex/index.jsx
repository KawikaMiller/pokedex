import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'

// react-bootstrap components
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
// react components
import RightCard from "../../right/RightCard";
import PokemonDisplay from "../../left/Display";
import BaseStats from "../BaseStats";
//redux
import { useSelector, useDispatch } from "react-redux";
import pokeSlice from "../../../../reduxStore/pokeSlice";
import dexSlice from "../../../../reduxStore/dexSlice";


function Pokedex (props) {
  const state = useSelector(state => state.pokemon);
  const settingsState = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const { toggleShiny, changeFormIdx, setPokemon } = pokeSlice.actions
  const { toggleIsLoading } = dexSlice.actions;

  const pleaseSearchAlert = () => {
    alert('Please search for a pokemon first')
  }

  const handleToggleShiny = () => {
    if(state.pokemon?.name){
      dispatch(toggleShiny(!state.showShiny))      
    } else {
      pleaseSearchAlert();
    }
  }

  const handleToggleForm = () => {
    if(state.pokemon?.name){
      let newApiIdx = state.formIdx + 1;
      if (newApiIdx >= state.pokemon.forms.length) {
        newApiIdx = 0;
      }
      dispatch(changeFormIdx(newApiIdx))      
    } else {
      pleaseSearchAlert();
    }
  }

  const handleSearch = async (event, id) => {
    event.preventDefault();
    dispatch(toggleIsLoading(true));
    let foundPokemon = await axios(`${process.env.REACT_APP_SERVER}/pokemon/${id}`);
    dispatch(setPokemon(foundPokemon.data.pokemon))
    dispatch(toggleIsLoading(false));
  }

  const handleAdjacentPokemon = (event, int) => {
    dispatch(changeFormIdx(0));
    if (state.pokemon?.name) {
      handleSearch(event, state.pokemon.id + int)
    } else {
      handleSearch(event, 1)
    }
  }

  const handleNextGen = (event) => {
    // if a search has been made and returned a result, then cycle up by generations
    if (state.pokemon?.name) {
    // if you're viewing pokemon within gen 1, move to gen 2
      if (state.pokemon.id <= 151) {
        handleSearch(event, 152)
    // if you're viewing pokemon within gen 2, move to gen 3 & etc.
      } else if (state.pokemon.id <= 251) {
        handleSearch(event, 252)
      } else if (state.pokemon.id <= 386) {
        handleSearch(event, 387)
      } else if (state.pokemon.id <= 493) {
        handleSearch(event, 495)
      } else if (state.pokemon.id <= 649) {
        handleSearch(event, 650)
      } else if (state.pokemon.id <= 721) {
        handleSearch(event, 722)
      } else if (state.pokemon.id <= 809) {
        handleSearch(event, 810)
      } else if (state.pokemon.id <= 905) {
        handleSearch(event, 906)
      } else if (state.pokemon.id <= 906) {
        handleSearch(event, 1)
      }
    } else {handleSearch(event, 1)}
  }

  const handlePreviousGen = (event) => {
    // if a search has been made and returned a result, cycle back by generations
    if (state.pokemon) {
      // if within gen 9, move back to first starter of gen 8
      if (state.pokemon.id >= 906) {
        handleSearch(event, 810)
      } else if (state.pokemon.id >= 810) {
        handleSearch(event, 722)
      } else if (state.pokemon.id >= 722) {
        handleSearch(event, 650)
      } else if (state.pokemon.id >= 650) {
        handleSearch(event, 495)
      } else if (state.pokemon.id >= 494) {
        handleSearch(event, 387)
      } else if (state.pokemon.id >= 387) {
        handleSearch(event, 252)
      } else if (state.pokemon.id >= 252) {
        handleSearch(event, 152)
      } else if (state.pokemon.id >= 152) {
        handleSearch(event, 1)
      } else if (state.pokemon.id >= 1) {
        handleSearch(event, 906)
      }
    // if no search has been made, move to gen 9
    } else {
      handleSearch(event, 906)
    }
  }

  return (
    <Container id='pokedex-container'>
      
      <CardGroup className={`pokedex ${settingsState.theme}`} id='pokedex-group'>

        {/* left side card */}
        <Card className={settingsState.theme} id='leftcard'>
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
            <Container id='pokedex_display_border' className={settingsState.theme}>
              <Container id='pokedex_display'>
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
                  <Button className={settingsState.theme} onClick={handleToggleForm}></Button>
                  <Button onClick={handleToggleShiny}></Button>
                </Container>

                <Container id='bottom-ui-basestats'>
                  {/* displays pokemon base stats */}
                  <BaseStats 
                      key={`${state.pokemon?.name}_basestats`}
                  />
                </Container>     

              </Container>

              <Container id='bottom-ui-dpad'>
                  <div id='dpad-up' onClick={handleNextGen}>
                    <FontAwesomeIcon icon={faPlay} rotation={270}/>
                  </div>
                  <div id='dpad-left' onClick={(event) => handleAdjacentPokemon(event, -1)}>
                    <FontAwesomeIcon icon={faPlay} rotation={180}/>
                  </div>
                  <div id='dpad-center'></div>
                  <div id='dpad-right' onClick={(event) => handleAdjacentPokemon(event, 1)}>
                    <FontAwesomeIcon icon={faPlay} />
                  </div>
                  <div id='dpad-down' onClick={handlePreviousGen}>
                    <FontAwesomeIcon icon={faPlay} rotation={90}/>
                  </div>
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