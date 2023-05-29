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

  let { modifyProperty } = pokeSlice.actions;

  dispatch(modifyProperty({
    property: 'level',
    value: 100
  }))
  // pokeState.pokemon.level = 100;
  const [pokemon, setPokemon] = useState(pokeState.pokemon)

  const updateStats = (newStats, newLevel, newNature) => {
    let newPokemon = pokemon;

    newPokemon.stats = newStats;
    newPokemon.level = newLevel;
    newPokemon.nature = newNature;

    setPokemon(newPokemon);
  }

  const updateBattleInfo = (battleMovesArr, battleAbility, heldItem) => {
    let newPokemon = pokemon;

    newPokemon.battleMoves = battleMovesArr;
    newPokemon.battleAbility = battleAbility;
    newPokemon.heldItem = heldItem;

    setPokemon(newPokemon)
  }

// updates and rerenders when props change | props change when searching a new pokemon
  useEffect(() => {
    dispatch(modifyProperty({
      property: 'level',
      value: 100
    }));
    setPokemon(pokeState.pokemon);
  }, [pokeState.pokemon])

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
              <p style={{margin: '0'}}>Lv. {pokemon.level}</p>
            </section>

          {/* shows stats */}
          <PlaceholderStats
            moves={pokemon.moves}
            abilities={pokemon.abilities} 
            stats={pokemon.stats}
            nature={pokemon.nature}
            level={100} 
            key={`${pokemon.name}_stats`}
            updateStats={updateStats}
            updateBattleInfo={updateBattleInfo}
            addTeamMember={() => props.addTeamMember(pokemon)} 
            name={pokeState.pokemon.name[0].toUpperCase() + pokeState.pokemon.name.slice(1)}
          />
        </Card.Body>
      </Card>
    )
}

export default PlaceholderTeamMember;