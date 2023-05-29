import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Ability from './Ability';
import { useSelector } from 'react-redux';

function Abilities (props){
  const pokeState = useSelector(state => state.pokemon)

  return(
    <Accordion defaultActiveKey={0}>
      {pokeState.pokemon.abilities ? 
        pokeState.pokemon.abilities.map((abilityData, idx) => 
          <Ability
            ability={abilityData}
            eventKey={idx} 
            key={`${abilityData.name}`}
          />)
        : 
          'no abilities found'}
    </Accordion>
  )
}

export default Abilities;