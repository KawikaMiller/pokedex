import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import dexSlice from '../../../reduxStore/dexSlice';

import Card from "react-bootstrap/Card"
import { CardGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import PokedexEntry from '../Entry';
import { sortMoves } from '../../../lib/movesLib';

function PokedexMainRight (props) {
  const dexState = useSelector(state => state.pokedex);
  const pokeState = useSelector(state => state.pokemon);
  const dispatch = useDispatch();

  let { setMainScreenIdx, setDexIdx, setAbilityIdx, setMoveIdx } = dexSlice.actions;

  const [sortedMoves, setSortedMoves] = useState([]);

  const changeScreen = (screenId) => {
    if(dexState.mainScreenIdx !== screenId){
      dispatch(setMainScreenIdx(screenId))      
    }
  }

  const nextDexEntry = () => {
    changeScreen(0);
    
    if (dexState.dexIdx === pokeState.pokemon.descriptions.length - 1) {
      dispatch(setDexIdx(0))
    } else {
      dispatch(setDexIdx(dexState.dexIdx + 1))
    }
  }

  const previousDexEntry = () => {
    changeScreen(0);

    if (dexState.dexIdx === 0) {
      dispatch(setDexIdx(pokeState.pokemon.descriptions.length - 1))
    } else {
      dispatch(setDexIdx(dexState.dexIdx - 1))
    }
  }

  const nextMoveEntry = () => {
    changeScreen(1);
    console.log('next move', dexState.mainScreenIdx);

    if (dexState.moveIdx === sortedMoves.length - 1) {
      console.log(sortedMoves);
      dispatch(setMoveIdx(0))
    } else {
      console.log(sortedMoves);
      dispatch(setMoveIdx(dexState.moveIdx + 1))  
    }
  }

  const previousMoveEntry = () => {
    changeScreen(1);

    if (dexState.moveIdx === 0) {
      dispatch(setMoveIdx(sortedMoves.length - 1));
    } else {
      dispatch(setMoveIdx(dexState.moveIdx - 1)); 
    }
  }

  const nextAbilityEntry = () => {
    changeScreen(2);

    if (dexState.abilityIdx === pokeState.pokemon.abilities.length - 1) {
      dispatch(setAbilityIdx(0));
    } else {
      dispatch(setAbilityIdx(dexState.abilityIdx + 1))
    }
  }

  const previousAbilityEntry = () => {
    changeScreen(2);

    if (dexState.abilityIdx === 0) {
      dispatch(setAbilityIdx(pokeState.pokemon.abilities.length - 1))
    } else {
      dispatch(setAbilityIdx(dexState.abilityIdx - 1)); 
    }
  }

  useEffect(() => {
    if (pokeState.pokemon?.moves !== undefined){
      let moves = pokeState.pokemon.moves
      sortMoves(moves, 'name');
      setSortedMoves(moves);     
    }
  }, [pokeState.pokemon])

  return(
    <>
    {/* black rectangle near top for displaying text */}
    <Container id='pokedex_entry_container'>
      {pokeState.pokemon?.name ?
        <PokedexEntry sortedMoves={sortedMoves} />
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