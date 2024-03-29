import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import sprites from '../../../../lib/sprites';

function PokemonDisplay (props){
  const state = useSelector(state => state.pokemon)
  const dexState = useSelector(state => state.pokedex);

  const [missingSprites, setMissingSprites] = useState(null);

  const getMissingSprites = () => {
    if (sprites[state.pokemon.name]) {
      setMissingSprites(sprites[state.pokemon.name])
    } else {
      setMissingSprites(null)
    }
  }

  useEffect(() => {
    getMissingSprites();
  }, 
  // eslint-disable-next-line
  [])


  return(
    
    <>
      {
        !dexState.isLoading ? 
          missingSprites ? 
            state.formIdx === 0 ? 
              state.showShiny ? 
                <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${state.pokemon.forms[state.formIdx].apiId}.png`}
                alt={`official shiny artwork for ${state.pokemon.name}`}
                /> 
              : 
                <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${state.pokemon.forms[state.formIdx].apiId}.png`}
                alt={`official artwork for ${state.pokemon.name}`}
                /> 
            : 
              state.showShiny ? 
                <img
                src={missingSprites[state.formIdx - 1]}
                alt="placeholder description"
                /> 
              : 
                <img
                src={missingSprites[state.formIdx - 1]}
                alt="placeholder description"
                /> 
          : 
            state.showShiny ? 
              <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${state.pokemon.forms[state.formIdx].apiId}.png`}
              alt={`official shiny artwork for ${state.pokemon.name}`}
              /> 
            : 
              <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${state.pokemon.forms[state.formIdx].apiId}.png`}
              alt={`official artwork for ${state.pokemon.name}`}
              /> 
        : 
        <>
          <Spinner animation="grow" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <Spinner animation="grow" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <Spinner animation="grow" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </>

          
      }
    </>
  )
}

export default PokemonDisplay;