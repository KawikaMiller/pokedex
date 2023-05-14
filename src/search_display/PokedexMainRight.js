import React, { useState } from 'react'

import Card from "react-bootstrap/Card"
import { CardGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import PokedexEntry from './PokedexEntry';
import { sortMoves } from '../lib/movesLib';

function PokedexMainRight (props) {
  const [screenId, setScreenId] = useState(0);
  const [dexEntryId, setDexEntryId] = useState(0);
  const [moveEntryId, setMoveEntryId] = useState(0);
  const [abilityEntryId, setAbilityEntryId] = useState(0);
  const [sortedMoves, setSortedMoves] = useState([]);
  const [movesSorted, setMovesSorted] = useState(false);

  const changeScreen = (screenID) => {
    if (screenId !== screenID) {
      setScreenId(screenID)  
    }
  }

  const nextDexEntry = () => {
    changeScreen(0)
    if (dexEntryId === props.pokemon.descriptions.length - 1) {
      setDexEntryId(0)
    } else {
      setDexEntryId(dexEntryId + 1)     
    }
  }

  const previousDexEntry = () => {
    changeScreen(0)

    if (dexEntryId === 0) {
      setDexEntryId(props.pokemon.descriptions.length - 1)
    } else {
      setDexEntryId(dexEntryId - 1)   
    }
  }

  const nextMoveEntry = () => {
    changeScreen(1)

    if (props.pokemon || !movesSorted ) {
      let moves = props.pokemon.moves
      sortMoves(moves, 'name');
      setSortedMoves(moves);
      setMovesSorted(true);
    }

    if (moveEntryId === sortedMoves.length - 1) {
      setMoveEntryId(0)
    } else {
      setMoveEntryId(moveEntryId + 1)    
    }
  }

  const previousMoveEntry = () => {
    changeScreen(1)

    if (props.pokemon || !movesSorted ) {
      let moves = props.pokemon.moves
      sortMoves(moves, 'name');
      setSortedMoves(moves);
      setMovesSorted(true);
    }

    if (moveEntryId === 0) {
      setMoveEntryId(sortedMoves.length - 1)
    } else {
      setMoveEntryId(moveEntryId - 1)    
    }
  }

  const nextAbilityEntry = () => {
    changeScreen(2)

    if (abilityEntryId === props.pokemon.abilities.length - 1) {
      setAbilityEntryId(0)
    } else {
      setAbilityEntryId(abilityEntryId + 1)   
    }
  }

  const previousAbilityEntry = () => {
    changeScreen(2)

    if (abilityEntryId === 0) {
      setAbilityEntryId(abilities.length - 1)
    } else {
      setAbilityEntryId(abilityEntryId - 1)    
    }
  }

  return(
    <>
    {/* black rectangle near top for displaying text */}
    <Container id='pokedex_entry_container'>
      {screenId === 0 && props.pokemon ?
        <PokedexEntry
          header1={props.pokemon.name[0].toUpperCase() + props.pokemon.name.slice(1)}
          header2={props.pokemon.descriptions.length ? props.pokemon.descriptions[dexEntryId].version : 'PokeAPI Error'}
          header3={props.pokemon.id.toString().padStart(3, '0')}
          details={props.pokemon.descriptions.length ? props.pokemon.descriptions[dexEntryId].description : 'PokeAPI Error' }
        />        
      :
      screenId === 1 && props.pokemon ?
        <PokedexEntry 
          header1={sortedMoves[moveEntryId].name}
          header3={sortedMoves[moveEntryId].dmgClass}
          details={sortedMoves[moveEntryId].description}
        />
      :
      screenId === 2 && props.pokemon ?
      <PokedexEntry 
        header1={props.pokemon.abilities[abilityEntryId].ability.name}
        header3={props.pokemon.abilities[abilityEntryId].is_hidden ? null : 'Hidden Ability'}
        details={props.pokemon.abilities[abilityEntryId].description}
      />
      :
        'Please Search for a Pokemon'
      }

    </Container>

    {/* 10 blue buttons */}
    <Container style={{width: '80%', marginTop: '2rem', padding: '0'}}>
      <CardGroup id='main_right_blue_buttons'>

        <Card bg='primary'>
          <Card.Header onClick={nextDexEntry}>
            Dex +
          </Card.Header>
          <Card.Footer onClick={previousDexEntry}>
            Dex -
          </Card.Footer>
        </Card>

        <Card bg='primary'>
          <Card.Header onClick={nextMoveEntry}>
            Move +
          </Card.Header>
          <Card.Footer onClick={previousMoveEntry}>
            Move -
          </Card.Footer>
        </Card>

        <Card bg='primary'>
          <Card.Header onClick={nextAbilityEntry}>
            Abilty +
          </Card.Header>
          <Card.Footer onClick={previousAbilityEntry}>
            Ability -
          </Card.Footer>
        </Card>

        <Card bg='primary'>
          <Card.Header>
            4
          </Card.Header>
          <Card.Footer>
            4
          </Card.Footer>
        </Card>

        <Card bg='primary'>
          <Card.Header>
            5
          </Card.Header>
          <Card.Footer>
            5
          </Card.Footer>
        </Card>

      </CardGroup>
    </Container>


    <Container style={{width: '80%', marginTop: '1rem', padding: '0'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', float: 'right', width: '40%', padding: '0'}}>
        <Button style={{width: '47.5%'}}></Button>
        <Button style={{width: '47.5%'}}></Button>                
      </div>
    </Container>

    <Container style={{width: '80%', marginTop: '1rem', padding: '0' }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{width: '40%', height: '5rem'}}>
          <CardGroup style={{height: '100%'}}>
            <Card>
              1
            </Card>
            <Card>
              2
            </Card>
          </CardGroup>
        </div>
        <div>
          <div style={{backgroundColor: 'gold', width: '4rem', height: '4rem', borderRadius: '50%'}}>

          </div>
        </div>
      </div>
    </Container>

    <Container style={{width: '80%', height: '10%', marginTop: '3rem', padding: '0'}}>
        <CardGroup style={{display: 'flex', justifyContent: 'space-between', height: '100%'}}>
          <Card style={{backgroundColor: 'grey', width: '40%', margin: '0 2rem 0 0'}}>

          </Card>
          <Card style={{backgroundColor: 'grey', width: '40%', margin: '0 0 0 2rem'}}>

          </Card>
        </CardGroup> 
    </Container>       
  </> 

  )
}

export default PokedexMainRight;