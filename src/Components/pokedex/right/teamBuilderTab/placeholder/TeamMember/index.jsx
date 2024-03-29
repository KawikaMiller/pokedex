import React from 'react';
import Card from 'react-bootstrap/Card';
import PlaceholderStats from '../Stats';

import { useSelector, /*useDispatch*/ } from 'react-redux';
import TypeBadge from '../../../../../type/Badge';
// import pokeSlice from '../../../../reduxStore/pokeSlice';


function PlaceholderTeamMember (props){
  const pokeState = useSelector(state => state.pokemon);

    return(
      <Card className='member0'>
        <Card.Header className='team_member_header'>
          <h6>{
            pokeState.pokemon.nickname ? 
              pokeState.pokemon.nickname
            :
              (pokeState.pokemon.name[0].toUpperCase() + pokeState.pokemon.name.slice(1))
          }</h6>
          <div id='placeholder_badges'>
            {pokeState.pokemon.types.map(element => <TypeBadge type={element.type.name} />)}            
          </div>
        </Card.Header>
        <Card.Body className='team_member_body'>
            <section id='placeholder_sprite'>
              <Card.Img 
                variant='top' 
                src={pokeState.pokemon.sprite.front_default}
              >
              </Card.Img>
              <p>Lv. {pokeState.pokemon.level}</p>
            </section>

          <PlaceholderStats key={`${pokeState.pokemon.name}_stats`} />
        </Card.Body>
      </Card>
    )
}

export default PlaceholderTeamMember;