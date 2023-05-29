import React from 'react';
import { useSelector, /*useDispatch*/ } from 'react-redux';
// import pokeSlice from '../reduxStore/pokeSlice';
// import dexSlice from '../reduxStore/dexSlice';

function PokedexEntry ({ sortedMoves }) {

  const dexState = useSelector(state => state.pokedex);
  const pokeState = useSelector(state => state.pokemon);
  // const dispatch = useDispatch();

  let header1 = '';
  let header2 = '';
  let header3 = '';
  let details = '';

  switch(dexState.mainScreenIdx){
    case 0:
      header1 = pokeState.pokemon?.name[0].toUpperCase() + pokeState.pokemon?.name.slice(1);
      header2 = pokeState.pokemon?.descriptions.length ? pokeState.pokemon?.descriptions[dexState.dexIdx].version : 'PokeAPI Error';
      header3 = pokeState.pokemon?.id.toString().padStart(3, '0');
      details = pokeState.pokemon?.descriptions.length ? pokeState.pokemon?.descriptions[dexState.dexIdx].description : 'PokeAPI Error';
      break;
    case 1:
      header1 = sortedMoves[dexState.moveIdx].name;
      header3 = sortedMoves[dexState.moveIdx].dmgClass;
      details = sortedMoves[dexState.moveIdx].description;
      break;
    case 2:
      header1 = pokeState.pokemon?.abilities[dexState.abilityIdx].name
      header3 = pokeState.pokemon?.abilities[dexState.abilityIdx].is_hidden ? null : 'Hidden Ability';
      details = pokeState.pokemon?.abilities[dexState.abilityIdx].description;
      break;
  }

  return(
    <>
      <div id='entry_header'>
        <p>{header1}</p>
        <p>{header2}</p>
        <p>{header3}</p>
      </div>
      <p id='entry_details'>
        {details}
      </p>      
    </>
  )
}

export default PokedexEntry;