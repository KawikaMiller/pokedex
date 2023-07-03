import React from 'react'
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';

import Learnset from '../moves/LearnSet';
import TypeBadge from '../../../../type/Badge';

import MainDetails from '../Details';

function RightMainTab (props) {

  const pokeState = useSelector(state => state.pokemon);

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