import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import Learnset from '../moves/LearnSet';
import TypeBadge from '../../../../type/Badge';

import dexSlice from '../../../../../reduxStore/dexSlice';
import MainDetails from '../Details';

function RightMainTab (props) {

  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex);

  const { toggleIsLoading } = dexSlice.actions;

  const [dexEntry, changeDexEntry] = useState(0);
  const [activeKey, setActiveKey] = useState(0);
  const [abilityKey, setAbilityKey] = useState(0);

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

  return(
    <Container className='rightMain'>

      <Container>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h2>{pokeState.pokemon?.name ? pokeState.pokemon.name[0].toUpperCase() + pokeState.pokemon.name.slice(1) : '--' }</h2>
            <h6>{pokeState.pokemon?.genus ? pokeState.pokemon.genus : '--'}</h6>
          </div>
          <div>
            <h4 style={{textAlign: 'end'}}>
              {pokeState.pokemon?.id ? `# ${pokeState.pokemon?.id.toString().padStart(4, '0')}` : '# 0000'}
            </h4>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              {pokeState.pokemon?.types ? pokeState.pokemon?.types.map(element => <TypeBadge type={element.type.name} />) : <TypeBadge type='--' />}           
            </div>
          </div>
        </div>
      </Container>

      <Container style={{height: '20vh', display: 'flex', flexDirection: 'column'}}>
        <MainDetails />
      </Container>

      <Container>
        <Learnset />
      </Container>

    </Container>
  )
}

export default RightMainTab;