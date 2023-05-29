import React, { useEffect, useState } from 'react';
import Stat from '../../stat/Stat';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { calculateStatTotal, calculateHpTotal, } from '../../../../lib/calcStats';

import { useSelector, useDispatch } from 'react-redux';
import pokeSlice from '../../../../reduxStore/pokeSlice';
import teamSlice from '../../../../reduxStore/teamSlice';

import EditPokemon from '../../../forms/editPokemon';

function PlaceholderStats(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const pokeState = useSelector(state => state.pokemon);
  const dispatch = useDispatch();
  let { modifyProperty, setPokemon } = pokeSlice.actions
  let { addToRoster } = teamSlice.actions

  // prevents EVs from totaling over 510
  const handleFormChange = (event) => {
    if (
      parseInt(event.target.form[1].value) +
      parseInt(event.target.form[3].value) +
      parseInt(event.target.form[5].value) +
      parseInt(event.target.form[7].value) +
      parseInt(event.target.form[9].value) +
      parseInt(event.target.form[11].value) > 510 ) {
        setDisableSubmit(true)
      } else {
        setDisableSubmit(false)
      }
  }

  const handleHideEditModal = () => {
    setShowEditModal(!showEditModal)
  }

  // gets form information and updates stats in this component and parent component
  const handleEditStats = (event) => {
    event.preventDefault();

    let newStats = [];
    let ivs = [
      undefined,
      event.target.iv_atk.value,
      event.target.iv_def.value,
      event.target.iv_spatk.value,
      event.target.iv_spdef.value,
      event.target.iv_spd.value
    ];
    let evs = [
      undefined,
      event.target.ev_atk.value,
      event.target.ev_def.value,
      event.target.ev_spatk.value,
      event.target.ev_spdef.value,
      event.target.ev_spd.value      
    ];
    
    for(let stat of pokeState.pokemon.stats){
      let newStat = {...stat};
      newStats = [...newStats, newStat];
    }

    // hp gets calculated differently than other stats
    newStats[0].iv = parseInt(event.target.iv_hp.value)
    newStats[0].ev = parseInt(event.target.ev_hp.value)
    newStats[0].stat_value = calculateHpTotal(
      pokeState.pokemon.stats[0].base_stat, 
      parseInt(event.target.iv_hp.value), 
      parseInt(event.target.ev_hp.value), 
      parseInt(event.target.level.value)
    )

    for (let i = 1; i < ivs.length; i++ ){
      newStats[i].iv = parseInt(ivs[i])
      newStats[i].ev = parseInt(evs[i])
      newStats[i].stat_value = calculateStatTotal(
        pokeState.pokemon.stats[i].name,
        pokeState.pokemon.stats[i].base_stat, 
        parseInt(ivs[i]), 
        parseInt(evs[i]), 
        parseInt(event.target.level.value), 
        event.target.nature.value
      )
    }

    // updates state
    dispatch(modifyProperty({
      property: 'level', 
      value: parseInt(event.target.level.value)
    }))
    dispatch(modifyProperty({
      property: 'stats',
      value: newStats
    }))
    dispatch(modifyProperty({
      property: 'nature', 
      value: event.target.nature.value
    }))
  
    handleHideEditModal();
  }

  const sortMoves = (arr) => {
    arr.sort((a,b) => {
      if(a.name < b.name){
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else return 0;
    })
  }

  const handleSubmitBattleInfo = (event) => {
    event.preventDefault();

    const battleMovesArr = [event.target.move_1.value, event.target.move_2.value, event.target.move_3.value, event.target.move_4.value]

    dispatch(modifyProperty({
      property: 'battleMoves', 
      value: battleMovesArr
    }));
    dispatch(modifyProperty({
      property: 'battleAbility', 
      value: event.target.battle_ability.value
    }));
    dispatch(modifyProperty({
      property: 'heldItem', 
      value: event.target.held_item.value
    }))

    handleHideEditModal()
  }

  // sorts moves on component mount
  useEffect(() => {
    let sortedMoves = [...pokeState.pokemon.moves];
    sortMoves(sortedMoves);
    dispatch(modifyProperty({
      property: 'moves', 
      value: sortedMoves
    }));
  }, [])

    return(
      <>
      <Container className='team_member_stats' >

        <div className='stats_sub_phys'>
          <Stat stat={pokeState.pokemon.stats[0]} />
          <Stat stat={pokeState.pokemon.stats[1]} />
          <Stat stat={pokeState.pokemon.stats[2]} />
        </div>

        <div className='stats_sub_spec'>
          <Stat stat={pokeState.pokemon.stats[3]} />
          <Stat stat={pokeState.pokemon.stats[4]} />
          <Stat stat={pokeState.pokemon.stats[5]} />
        </div>

        <div className='placeholder_buttons'>

          <Button
            style={{ margin: '0.5rem 0', padding: '0'}}
            onClick={() => setShowEditModal(!showEditModal)}
          >
            Edit
          </Button>

          <Button 
            style={{ margin: '0.5rem 0', padding: '0'}}
            variant='success' 
            onClick={() => dispatch(addToRoster(pokeState.pokemon))} 
          >
          + To Team
          </Button>
        </div>
      </Container>

      {showEditModal ? 
         <EditPokemon />
      : 
        null
      }

    </>
    )
}

export default PlaceholderStats;