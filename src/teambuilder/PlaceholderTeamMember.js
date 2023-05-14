import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import PlaceholderStats from './PlaceholderStats';

function PlaceholderTeamMember (props){
  props.searchResult.level = 100;
  const [pokemon, setPokemon] = useState(props.searchResult)

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
  const componentDidUpdate = (prevProps) => {
    if (prevProps !== props) {
      props.searchResult.level = 100;
      setPokemon(props.searchResult);
    }
  }

    return(
      <Card className='member0'>
        <Card.Body className='team_member_body'>
          {/* shows sprite and level */}
            <section id='placeholder_sprite'>
              <Card.Img 
                variant='top' 
                src={props.searchResult.sprite.front_default}
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
            name={props.searchResult.name[0].toUpperCase() + props.searchResult.name.slice(1)}
          />
        </Card.Body>
      </Card>
    )
}

export default PlaceholderTeamMember;