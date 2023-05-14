import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Ability from './Ability';


function Abilities (props){
  const [abilities, setAbilities] = useState([])

  return(
    <Accordion defaultActiveKey={0}>
      {props.abilities ? 
        props.abilities.map((abilityData, idx) => 
          <Ability
            ability={abilityData}
            eventKey={idx} 
            key={`ability_${idx}`}
          />)
        : 
          'no abilities found'}
    </Accordion>
  )
}

export default Abilities;