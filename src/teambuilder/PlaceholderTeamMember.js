import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PlaceholderStats from './PlaceholderStats';

import { useSelector, useDispatch } from 'react-redux';
import teamSlice from '../reduxStore/teamSlice';
import pokeSlice from '../reduxStore/pokeSlice';

function PlaceholderTeamMember (props){
  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);
  let dispatch = useDispatch();

  let { modifyProperty, setPokemon } = pokeSlice.actions;

  const updateBattleInfo = (battleMovesArr, battleAbility, heldItem) => {
    let newPokemon = {...pokeState.pokemon};

    newPokemon.battleMoves = battleMovesArr;
    newPokemon.battleAbility = battleAbility;
    newPokemon.heldItem = heldItem;

    dispatch(setPokemon(newPokemon));
  }

// updates and rerenders when props change | props change when searching a new pokemon
  // useEffect(() => {
  //   dispatch(modifyProperty({
  //     property: 'level',
  //     value: 100
  //   }));
  //   dispatch(setPokemon(pokeState.pokemon));
  // }, [pokeState.pokemon])
    console.log(pokeState.pokemon)
    return(
      <Card className='member0'>
        <Card.Body className='team_member_body'>
          {/* shows sprite and level */}
            <section id='placeholder_sprite'>
              <Card.Img 
                variant='top' 
                src={pokeState.pokemon.sprite.front_default}
                style={{backgroundColor: 'white', borderRadius: '50%', width: '90%'}}
              >
              </Card.Img>
              <p style={{margin: '0'}}>Lv. {pokeState.pokemon.level}</p>
            </section>

          <PlaceholderStats key={`${pokeState.pokemon.name}_stats`} />
        </Card.Body>
      </Card>
    )
}

export default PlaceholderTeamMember;