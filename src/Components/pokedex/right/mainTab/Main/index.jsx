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
        <div id='pokemon_basic_info'>
          <div>
            <h2 id='pokemon_name'>{pokeState.pokemon?.name ? pokeState.pokemon.name[0].toUpperCase() + pokeState.pokemon.name.slice(1) : '--' }</h2>
            <h6 id='pokemon_genus'>{pokeState.pokemon?.genus ? pokeState.pokemon.genus : '--'}</h6>
          </div>
          <div>
            <h4 id='pokemon_id'>
              {pokeState.pokemon?.id ? `# ${pokeState.pokemon?.id.toString().padStart(4, '0')}` : '# 0000'}
            </h4>
            <div id='pokemon_types'>
              {pokeState.pokemon?.types ? pokeState.pokemon?.types.map(element => <TypeBadge type={element.type.name} />) : <TypeBadge type='--' />}           
            </div>
          </div>
        </div>
      </Container>

      <Container id='main_details_container'>
        <MainDetails />
      </Container>

      <Container>
        <Learnset />
      </Container>

    </Container>
  )
}

export default RightMainTab;