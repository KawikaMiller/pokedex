import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Ability from '../Ability';
import { useSelector } from 'react-redux';

function Abilities (props){
  const pokeState = useSelector(state => state.pokemon)
  const [activeKey, setActiveKey] = useState('0');

  const handleKeyChange = (key) => {
    if(key !== null){
      setActiveKey(key)
    }
  }

  return(
    <Accordion defaultActiveKey={activeKey} activeKey={activeKey} onSelect={e => handleKeyChange(e) }>
      {pokeState.pokemon.abilities ? 
        pokeState.pokemon.abilities.map((abilityData, idx) => 
          <Ability
            ability={abilityData}
            eventKey={`${idx}`} 
            key={`${abilityData.name}`}
          />)
        : 
          'no abilities found'}
    </Accordion>
  )
}

export default Abilities;