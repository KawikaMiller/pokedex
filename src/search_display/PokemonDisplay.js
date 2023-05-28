import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import sprites from '../lib/sprites'

function PokemonDisplay (props){
  const state = useSelector(state => state.pokemon)
  const dispatch = useDispatch();
  // let { toggleShiny } = pokeSlice.actions

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
  }, [])


  return(
    <>
      {
        state.pokemon ? 
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
                /> 
              : 
                <img
                src={missingSprites[state.formIdx - 1]}
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
          null
        
        // if it is, check if we need to get missing sprites

        // if we do, then we need to cycle between the default sprite from pokeapi and the supplemental sprites from our imported module

        // if we don't need missing sprites, display the info from pokeapi
      }
    </>
  )
}

export default PokemonDisplay;