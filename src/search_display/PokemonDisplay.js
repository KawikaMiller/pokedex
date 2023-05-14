import React, { useState } from "react";
import sprites from '../lib/sprites'

function PokemonDisplay (props){
  const [missingSprites, setMissingSprites] = useState(null);

  const getMissingSprite = () => {
    if (sprites[props.name]) {
      setMissingSprites(sprites[props.name])
    } else {
      setMissingSprites(null)
    }
  }

  const componentDidMount = () => {
    getMissingSprite();
  }

  return(
    <>
      {
        // is props.id valid?
        props.id ? 
          missingSprites ? 
            props.formIdx === 0 ? 
              props.toggleShiny ? 
                <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${props.id}.png`}
                alt={`official shiny artwork for ${props.name}`}
                /> 
              : 
                <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}
                alt={`official artwork for ${props.name}`}
                /> 
            : 
              props.toggleShiny ? 
                <img
                src={missingSprites[props.formIdx - 1]}
                /> 
              : 
                <img
                src={missingSprites[props.formIdx - 1]}
                /> 
          : 
            props.toggleShiny ? 
              <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${props.id}.png`}
              alt={`official shiny artwork for ${props.name}`}
              /> 
            : 
              <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`}
              alt={`official artwork for ${props.name}`}
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