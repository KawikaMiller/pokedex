import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

import { determineTypeEffectiveness } from "../../../../../lib/typeEffectiveness";
import TypeMatchup from "./TypeMatchup";
import AbilityDetails from "./Ability";
import Bio from "./Bio";
import DexEntries from "./DexEntries";

function MainDetails(props) {

  const pokeState = useSelector(state => state.pokemon);
  const settingsState = useSelector(state => state.settings);

  const [dexEntry, changeDexEntry] = useState(0);
  const [activeKey, setActiveKey] = useState(0);
  const [abilityKey, setAbilityKey] = useState(0);
  const [typeEffectiveness, setTypeEffectiveness] = useState([]);

  const handleChangeDexEntry = (value) => {
    // reset back to 0 when at end of descriptions
    if (dexEntry + value >= pokeState.pokemon.descriptions.length) {
      changeDexEntry(0);
    }
    // cycle back to end of descriptions if trying to go 'previous' from 0
    else if (dexEntry + value < 0) {
      changeDexEntry(pokeState.pokemon.descriptions.length - 1)
    }
    else {
      changeDexEntry(dexEntry + value)
    }
  }

  const handleChangeAbility = (value) => {
    // reset back to 0 when at end of descriptions
    if (abilityKey + value >= pokeState.pokemon.abilities.length) {
      setAbilityKey(0);
    }
    // cycle back to end of descriptions if trying to go 'previous' from 0
    else if (abilityKey + value < 0) {
      setAbilityKey(pokeState.pokemon.abilities.length - 1)
    }
    else {
      setAbilityKey(abilityKey + value)
    }
  }

  useEffect(() => {
    if (pokeState.pokemon?.types){
      setTypeEffectiveness([]);
      setTypeEffectiveness(determineTypeEffectiveness(pokeState.pokemon.types));      
    }
  }, [pokeState.pokemon])

  return(
    <Card className={`details ${settingsState.theme}`}>

    <Card.Header className={settingsState.theme}>
      <Nav variant='tabs' defaultActiveKey={activeKey}>
        <Nav.Item className='subCard'>
          <Nav.Link className={settingsState.theme} eventKey={0} onClick={() => setActiveKey(0)}>
            Dex
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='subCard'>
          <Nav.Link className={settingsState.theme} eventKey={1} onClick={() => setActiveKey(1)}>
            Bio
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='subCard'>
          <Nav.Link className={settingsState.theme} eventKey={2} onClick={() => setActiveKey(2)}>
            Ability
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className='subCard'>
          <Nav.Link className={settingsState.theme} eventKey={3} onClick={() => setActiveKey(3)}>
            Type Matchup
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Card.Header>

    <Card.Body id="details_card_body">

      {activeKey === 0 ?
      
      <DexEntries dexEntry={dexEntry} handleChangeDexEntry={handleChangeDexEntry} />

      :

      activeKey === 1 ?

      <Bio />

      :

      activeKey === 2 ?

      <AbilityDetails abilityKey={abilityKey} handleChangeAbility={handleChangeAbility}/>
      
      :

      activeKey === 3 ?

      <TypeMatchup typeEffectiveness={typeEffectiveness}/>

      :

      null
        
      }

    </Card.Body>
  </Card>
  )

}

export default MainDetails;