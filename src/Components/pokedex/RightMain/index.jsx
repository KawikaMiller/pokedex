import React from 'react'
import { useSelector } from 'react-redux';
import { ProgressBar } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

import '../../../css/rightCard.css'
import Learnset from '../../moves/LearnSet';
import TypeBadge from '../../type/Badge';
import Abilities from '../../abilities/AbilitiesList';

function PokedexMainRight (props) {

  const pokeState = useSelector(state => state.pokemon);

  return(
    <Container style={{display: 'flex', height: '100%'}} className='rightMain'>

      <Container style={{height: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} id='pokeInfo'>
        <div>
          <h4>{pokeState.pokemon?.name[0].toUpperCase()+pokeState.pokemon?.name.slice(1)} </h4>
          <p className='genus'>{pokeState.pokemon?.genus}</p>
          <p>{`# ${pokeState.pokemon?.id.toString().padStart(4, '0')}`}</p>
          <div className='spread'>
            {pokeState.pokemon?.types.map(element => <TypeBadge type={element.type.name} />)}          
          </div>        
        </div>

        <div>
          <div className='centered'>
            <p className='underline'>Gender Ratio</p>
            <ProgressBar now={100 - (100 * (pokeState.pokemon?.genderRate / 8))} style={{backgroundColor: 'hotpink', border: '1px solid white'}}/>
            <p>♂ {100 - (100 * (pokeState.pokemon?.genderRate / 8))} | ♀{100 * pokeState.pokemon?.genderRate / 8}</p>
          </div>
          <div className='spread'>
            <div className='centered'>
              <p className='underline'>Height</p>
              <p>{pokeState.pokemon?.height.m}m</p>
            </div>
            <div>
              <p className='underline'>Weight</p>
              <p>{pokeState.pokemon?.weight.kg}kg</p>
            </div>
          </div>
        </div>


        <div className='centered'>
          <p className='underline'>Egg Groups</p>
          {pokeState.pokemon?.eggGroups.map((element, idx) => {
            if(idx + 1 === pokeState.pokemon.eggGroups.length){
              return ` ${element}`
            } else {
              return ` ${element} |`
            }
          })}
        </div>
        <div className='centered'>
          <p className='underline'>Hatch Time</p>
          <p>{pokeState.pokemon?.hatchTime} Cycles</p>
        </div>
        <div className='centered'>
          <p className='underline'>Catch Rate</p>
          <p>{pokeState.pokemon?.catchRate}</p>
        </div>
        <div className='centered'>
          <p className='underline'>Level Rate</p>
          <p>{pokeState.pokemon?.growthRate.name}</p>
        </div>
        <div className='centered'>
          <p className='underline'>EV Yield</p>
          <p>{pokeState.pokemon?.evYields.map(element => {
            if(element.yield > 0){
              return `${element.yield} ${element.name.toUpperCase()} `
            } else {
              return null;
            }
          })}</p>
        </div>
        <div className='centered'>
          <p className='underline'>Base Exp Yield</p>
          <p>{pokeState.pokemon?.baseExpYield}</p>
        </div>
      </Container>

      <Container style={{display: 'flex', flexDirection: 'column', justifyContent:'space-between', padding: '0', margin: '0'}} id='pokeMovesAbilities'>
        <Container style={{padding: '0', margin: '0', height: '100%', border: '1px solid white'}}>
          <p>Pokedex Entries here</p>
        </Container>
        <Container style={{padding: '0', margin: '0'}}>
          {
            pokeState.pokemon?.name ? 
            <>
              <Abilities key={`${pokeState.pokemon?.name}_abilities`}/>
              <Learnset key={`${pokeState.pokemon?.name}_moves`}/>            
            </>
            :
            null
          }
        </Container>
      </Container>

    </Container>
  )
}

export default PokedexMainRight;