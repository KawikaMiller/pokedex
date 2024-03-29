import React, { useState } from 'react';
import { natureModifiers } from '../../../lib/calcStats';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import pokeSlice from '../../../reduxStore/pokeSlice';
import teamSlice from '../../../reduxStore/teamSlice';
import { useSelector, useDispatch } from 'react-redux';
import { calculateHpTotal, calculateStatTotal } from '../../../lib/calcStats';

function EditPokemon(props){
  const [disableSubmit, setDisableSubmit] = useState(false);

  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);
  const settingsState = useSelector(state => state.settings);
  let dispatch = useDispatch();
  let { modifyProperty } = pokeSlice.actions;
  let { modifyMemberProperty } = teamSlice.actions

  console.log(props);

  const handleSubmitToPokeState = (event) => {
    event.preventDefault();

    dispatch(modifyProperty({
      property: 'level',
      value: parseInt(event.target.level.value)
    }))

    dispatch(modifyProperty({
      property: 'nickname',
      value: event.target.pokemon_nickname.value,
    }))

    dispatch(modifyProperty({
      property: 'nature',
      value: event.target.nature.value
    }))

    dispatch(modifyProperty({
      property: 'battleAbility',
      value: event.target.battle_ability.value
    }))

    dispatch(modifyProperty({
      property: 'heldItem',
      value: event.target.held_item.value
    }))

    dispatch(modifyProperty({
      property: 'battleMoves',
      value: [event.target.move_1.value, event.target.move_2.value, event.target.move_3.value, event.target.move_4.value ]
    }))

    let newStats = [];

    for(const stat of pokeState.pokemon.stats){
      newStats = [...newStats, {...stat}]
    }

    newStats[0].iv = parseInt(event.target.iv_hp.value)
    newStats[0].ev = parseInt(event.target.ev_hp.value)
    newStats[0].stat_value = calculateHpTotal(newStats[0].base_stat, newStats[0].iv, newStats[0].ev, parseInt(event.target.level.value) );

    newStats[1].iv = parseInt(event.target.iv_atk.value)
    newStats[1].ev = parseInt(event.target.ev_atk.value)
    newStats[1].stat_value = calculateStatTotal(newStats[1].name, newStats[1].base_stat, newStats[1].iv, newStats[1].ev, parseInt(event.target.level.value), event.target.nature.value);

    newStats[2].iv = parseInt(event.target.iv_def.value)
    newStats[2].ev = parseInt(event.target.ev_def.value)
    newStats[2].stat_value = calculateStatTotal(newStats[2].name, newStats[2].base_stat, newStats[2].iv, newStats[2].ev, parseInt(event.target.level.value), event.target.nature.value);

    newStats[3].iv = parseInt(event.target.iv_spatk.value)
    newStats[3].ev = parseInt(event.target.ev_spatk.value)
    newStats[3].stat_value = calculateStatTotal(newStats[3].name, newStats[3].base_stat, newStats[3].iv, newStats[3].ev, parseInt(event.target.level.value), event.target.nature.value);

    newStats[4].iv = parseInt(event.target.iv_spdef.value)
    newStats[4].ev = parseInt(event.target.ev_spdef.value)
    newStats[4].stat_value = calculateStatTotal(newStats[4].name, newStats[4].base_stat, newStats[4].iv, newStats[4].ev, parseInt(event.target.level.value), event.target.nature.value);

    newStats[5].iv = parseInt(event.target.iv_spd.value)
    newStats[5].ev = parseInt(event.target.ev_spd.value)
    newStats[5].stat_value = calculateStatTotal(newStats[5].name, newStats[5].base_stat, newStats[5].iv, newStats[5].ev, parseInt(event.target.level.value), event.target.nature.value);

    dispatch(modifyProperty({
      property: 'stats',
      value: newStats
    }))

    props.toggleModal();
  }

  const handleModifyTeamMember = (event, rosterIdx) => {
    event.preventDefault();

    dispatch(modifyMemberProperty({
      property: 'level',
      value: parseInt(event.target.level.value),
      idx: props.idx
    }))

    dispatch(modifyMemberProperty({
      property: 'nickname',
      value: event.target.pokemon_nickname.value,
      idx: props.idx
    }))

    dispatch(modifyMemberProperty({
      property: 'nature',
      value: event.target.nature.value,
      idx: props.idx
    }))

    dispatch(modifyMemberProperty({
      property: 'battleAbility',
      value: event.target.battle_ability.value,
      idx: props.idx
    }))

    dispatch(modifyMemberProperty({
      property: 'heldItem',
      value: event.target.held_item.value,
      idx: props.idx
    }))

    dispatch(modifyMemberProperty({
      property: 'battleMoves',
      value: [event.target.move_1.value, event.target.move_2.value, event.target.move_3.value, event.target.move_4.value ],
      idx: props.idx
    }))

    let newStats = [];

    for(const stat of teamState.roster[rosterIdx].stats){
      newStats = [...newStats, {...stat}]
    }

    newStats[0].iv = parseInt(event.target.iv_hp.value)
    newStats[0].ev = parseInt(event.target.ev_hp.value)
    newStats[1].iv = parseInt(event.target.iv_atk.value)
    newStats[1].ev = parseInt(event.target.ev_atk.value)
    newStats[2].iv = parseInt(event.target.iv_def.value)
    newStats[2].ev = parseInt(event.target.ev_def.value)
    newStats[3].iv = parseInt(event.target.iv_spatk.value)
    newStats[3].ev = parseInt(event.target.ev_spatk.value)
    newStats[4].iv = parseInt(event.target.iv_spdef.value)
    newStats[4].ev = parseInt(event.target.ev_spdef.value)
    newStats[5].iv = parseInt(event.target.iv_spd.value)
    newStats[5].ev = parseInt(event.target.ev_spd.value)

    dispatch(modifyMemberProperty({
      property: 'stats',
      value: newStats,
      idx: props.idx
    }))

    props.toggleModal();
  }

  const checkIvEvLimit = (event) => {
    if (
      parseInt(event.target.form[11].value) +
      parseInt(event.target.form[13].value) +
      parseInt(event.target.form[15].value) +
      parseInt(event.target.form[17].value) +
      parseInt(event.target.form[19].value) +
      parseInt(event.target.form[21].value) > 510 ) {
        setDisableSubmit(true)
      } else {
        setDisableSubmit(false)
      }
  }

  natureModifiers.sort((a,b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name){
      return -1
    } else return 0;
  })

  return(
    <Modal centered show={props.showEditModal} size='lg' onHide={props.toggleModal}>

    <Modal.Header> Edit Pokemon </Modal.Header>

    <Modal.Body>

        <Form 
          onSubmit={props.idx === undefined ? 
            handleSubmitToPokeState 
          : 
            (event) => {handleModifyTeamMember(event, props.idx)}
          }>

          <Form.Group id='battle_moves' className='battle_moves_form'>

            <Container id='battle_moves_container' >

              <div className='edit_pokemon_section'>

                <div>
                    <Form.Label>Level</Form.Label>
                    <Form.Control 
                      type="number" 
                      id='level' 
                      placeholder={pokeState.pokemon.level ? pokeState.pokemon.level : 'Level'}
                      defaultValue={pokeState.pokemon.level ? pokeState.pokemon.level : 100} 
                      min='1' max='100' ></Form.Control>
                </div>

                <div>
                    <Form.Label>Nature</Form.Label>
                    <Form.Select 
                      id='nature' 
                      defaultValue={pokeState.pokemon.nature ? pokeState.pokemon.nature : 'bashful'} 
                    >
                      {natureModifiers.map(nature => (
                        <option value={nature.name.toLowerCase()}>{nature.name}</option>
                      ))}
                    </Form.Select>
                </div>
              </div>

              <div className='edit_pokemon_section'>

                <div>
                  <Form.Label>Ability</Form.Label>
                  <Form.Select id='battle_ability'>
                    {pokeState.pokemon.abilities.map(ability => (
                      <option value={ability.name}>{ability.name}</option>
                    ))}
                  </Form.Select>
                </div>
                
                <div>
                  <Form.Label>Held Item</Form.Label>
                  <Form.Select id='held_item'>
                    <option value='Oran Berry'>Coming soon...</option>
                  </Form.Select>  
                </div>

              </div>
              
              <div className='edit_pokemon_section'>
                <div>
                  <Form.Label>Move 1</Form.Label>
                  <Form.Select id='move_1'>
                    {pokeState.pokemon.moves.map((element, idx) => {
                      if (element.name === pokeState.pokemon.moves[idx - 1]?.name){
                        return null;
                      } else {
                        return <option value={element.name}>{element.name}</option>;
                      }
                    })}
                  </Form.Select>                    
                </div>
                
                <div>
                  <Form.Label>Move 2</Form.Label>
                  <Form.Select id="move_2">
                    {pokeState.pokemon.moves.map((element, idx) => {
                      if (element.name === pokeState.pokemon.moves[idx - 1]?.name){
                        return null;
                      } else {
                        return <option value={element.name}>{element.name}</option>;
                      }
                    })}
                  </Form.Select>                     
                </div>
              </div>

              <div className='edit_pokemon_section'>
                <div>
                  <Form.Label>Move 3</Form.Label>
                  <Form.Select id='move_3'>
                    {pokeState.pokemon.moves.map((element, idx) => {
                      if (element.name === pokeState.pokemon.moves[idx - 1]?.name){
                        return null;
                      } else {
                        return <option value={element.name}>{element.name}</option>;
                      }
                    })}
                  </Form.Select>                    
                </div>
                
                <div>
                  <Form.Label>Move 4</Form.Label>
                  <Form.Select id='move_4'>
                    {pokeState.pokemon.moves.map((element, idx) => {
                      if (element.name === pokeState.pokemon.moves[idx - 1]?.name){
                        return null;
                      } else {
                        return <option value={element.name}>{element.name}</option>;
                      }
                    })}
                  </Form.Select>                     
                </div>
              </div>
            </Container>
          </Form.Group>

          <Container id='team_member_stats_edit'>

            <Form.Group id='ivev_labels' className='ivev_form'>
              <Form.Label className='hidden'>STAT</Form.Label>
              <Form.Control
                type='text'
                disabled
                placeholder='IV'
              >
              </Form.Control>
              <Form.Control
                type='text'
                disabled
                placeholder='EV'
              >
              </Form.Control>
            </Form.Group>
        
            {/* HP, ATK, DEF */}
            <div id='hp_phys' onChange={checkIvEvLimit}>
              {/* HP IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>HP</Form.Label>
                <Form.Control 
                  type="number" 
                  id='iv_hp' 
                  placeholder={pokeState.pokemon.stats[0].iv ? pokeState.pokemon.stats[0].iv : 'IVs'}
                  defaultValue={pokeState.pokemon.stats[0].iv ? pokeState.pokemon.stats[0].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_hp' 
                  placeholder={pokeState.pokemon.stats[0].ev ? pokeState.pokemon.stats[0].ev : 'EVs'}
                  defaultValue={pokeState.pokemon.stats[0].ev ? pokeState.pokemon.stats[0].ev : 0} 
                  min='0' max='255' ></Form.Control>
              </Form.Group>

              {/* Attack IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>ATK</Form.Label>
                <Form.Control 
                  type="number" 
                  id='iv_atk' 
                  placeholder={pokeState.pokemon.stats[1].iv ? pokeState.pokemon.stats[1].iv : 'IVs'}
                  defaultValue={pokeState.pokemon.stats[1].iv ? pokeState.pokemon.stats[1].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_atk' 
                  placeholder={pokeState.pokemon.stats[1].ev ? pokeState.pokemon.stats[1].ev : 'EVs'}
                  defaultValue={pokeState.pokemon.stats[1].ev ? pokeState.pokemon.stats[1].ev : 0} 
                  min='0' max='255' ></Form.Control>
              </Form.Group>

              {/* Defense IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>DEF</Form.Label>
                
                <Form.Control 
                  type="number" 
                  id='iv_def' 
                  placeholder={pokeState.pokemon.stats[2].iv ? pokeState.pokemon.stats[2].iv : 'IVs'}
                  defaultValue={pokeState.pokemon.stats[2].iv ? pokeState.pokemon.stats[2].iv : 0} 
                  min='0' max='31' ></Form.Control>
                  
                <Form.Control 
                  type="number" 
                  id='ev_def' 
                  placeholder={pokeState.pokemon.stats[2].ev ? pokeState.pokemon.stats[2].ev : 'EVs'}
                  defaultValue={pokeState.pokemon.stats[2].ev ? pokeState.pokemon.stats[2].ev : 0}  
                  min='0' max='255' ></Form.Control>
              </Form.Group>

              {/* Special Attack IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>SPATK</Form.Label>
                <Form.Control 
                  type="number" 
                  id='iv_spatk' 
                  placeholder={pokeState.pokemon.stats[3].iv ? pokeState.pokemon.stats[3].iv : 'IVs'}
                  defaultValue={pokeState.pokemon.stats[3].iv ? pokeState.pokemon.stats[3].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_spatk' 
                  placeholder={pokeState.pokemon.stats[3].ev ? pokeState.pokemon.stats[3].ev : 'EVs'}
                  defaultValue={pokeState.pokemon.stats[3].ev ? pokeState.pokemon.stats[3].ev : 0} 
                  min='0' max='255' ></Form.Control>
              </Form.Group>

              {/* Special Defense IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>SPDEF</Form.Label>
                <Form.Control 
                  type="number" 
                  id='iv_spdef' 
                  placeholder={pokeState.pokemon.stats[4].iv ? pokeState.pokemon.stats[4].iv : 'IVs'}
                  defaultValue={pokeState.pokemon.stats[4].iv ? pokeState.pokemon.stats[4].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_spdef' 
                  placeholder={pokeState.pokemon.stats[4].ev ? pokeState.pokemon.stats[4].ev : 'EVs'}
                  defaultValue={pokeState.pokemon.stats[4].ev ? pokeState.pokemon.stats[4].ev : 0} 
                  min='0' max='255'></Form.Control>
              </Form.Group>

              {/* Speed IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>SPD</Form.Label>
                <Form.Control 
                  type="number" 
                  id='iv_spd' 
                  placeholder={pokeState.pokemon.stats[5].iv ? pokeState.pokemon.stats[5].iv : 'IVs'}
                  defaultValue={pokeState.pokemon.stats[5].iv ? pokeState.pokemon.stats[5].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_spd' 
                  placeholder={pokeState.pokemon.stats[5].ev ? pokeState.pokemon.stats[5].ev : 'EVs'}
                  defaultValue={pokeState.pokemon.stats[5].ev ? pokeState.pokemon.stats[5].ev : 0} 
                  min='0' max='255' ></Form.Control>
              </Form.Group>
            </div>

          </Container>
            <div id='nickname'>
              <Form.Group id='pokemon_nickname_form'>
                <Form.Label>Nickname</Form.Label>
                <Form.Control type='text' id='pokemon_nickname' minLength={1} maxLength={12} />
                <Form.Text>Leave blank for no nickname</Form.Text>
              </Form.Group>
              
              <div>
                <Form.Group id='ivev_submit'>
                  <Form.Label className='hidden'>SUBMIT</Form.Label>
                  <Button className={settingsState.theme} type='submit' disabled={disableSubmit ? true : false}>Save</Button>
                  {disableSubmit ? 
                    <Form.Text>EVs cannot total more than 510</Form.Text>                     
                  : 
                    <Form.Text className='hidden'>EVs cannot total more than 510</Form.Text>
                  }
                </Form.Group>

              </div>

              
            </div>
        </Form>
      </Modal.Body>
    </Modal>    
  )

}

export default EditPokemon;
