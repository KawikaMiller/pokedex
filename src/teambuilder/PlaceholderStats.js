import React, { useEffect, useState } from 'react';
import Stat from './Stat';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { calculateStatTotal, calculateHpTotal, } from '../lib/calcStats';

import { useSelector, useDispatch } from 'react-redux';
import pokeSlice from '../reduxStore/pokeSlice';
import teamSlice from '../reduxStore/teamSlice';

function PlaceholderStats(props) {
  const [showMovesModal, setShowMovesModal] = useState(false);
  const [showIvEvModal, setShowIvEvModal] = useState(false);
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
      parseInt(event.target.form[7].value )+
      parseInt(event.target.form[9].value) +
      parseInt(event.target.form[11].value) > 510 ) {
        setDisableSubmit(true)
      } else {
        setDisableSubmit(false)
      }
  }

  // toggles visibility of edit stats modal
  const handleHideIvEvModal = () => {
    setShowIvEvModal(!showIvEvModal)
  }

  const handleHideMovesModal = () => {
    setShowMovesModal(!showMovesModal)
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
  
    handleHideIvEvModal();
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

    handleHideMovesModal()
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
            onClick={handleHideMovesModal}
          >
            Moves
          </Button>

          <Button 
            style={{ margin: '0.5rem 0', padding: '0'}}
            onClick={handleHideIvEvModal}
          >
            IV/EV
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

      <Modal centered show={showMovesModal} onHide={handleHideMovesModal} >
        <Modal.Header>
          Battle Info
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitBattleInfo}>
            <Form.Group id='battle_moves' className='battle_moves_form'>
              <Container style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
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
                
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <div>
                    <Form.Label>Move 1</Form.Label>
                    <Form.Select id='move_1'>
                      {pokeState.pokemon.moves.map((element, idx) => {
                        if (element.name === pokeState.pokemon.moves[idx - 1]?.name){
                          return;
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
                          return;
                        } else {
                          return <option value={element.name}>{element.name}</option>;
                        }
                      })}
                    </Form.Select>                     
                  </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <div>
                    <Form.Label>Move 3</Form.Label>
                    <Form.Select id='move_3'>
                      {pokeState.pokemon.moves.map((element, idx) => {
                        if (element.name === pokeState.pokemon.moves[idx - 1]?.name){
                          return;
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
                          return;
                        } else {
                          return <option value={element.name}>{element.name}</option>;
                        }
                      })}
                    </Form.Select>                     
                  </div>
                </div>

                <div style={{alignSelf: 'flex-end', margin: '1rem'}}>
                  <Button type='submit'>
                    Save
                  </Button>
                </div>
              </Container>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {/* handles editing stat IV and EV values */}
      <Modal centered show={showIvEvModal} onHide={handleHideIvEvModal}>
        <Modal.Header>Edit IVs & EVs <span>EV totals must be 510 or less</span></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditStats} onChange={handleFormChange}>  
            <Container id='team_member_stats_edit'>
              {/* HP, ATK, DEF */}
              <div id='hp_phys'>

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
              </div>
              
              {/* SPATK, SPDEF, SPD */}
              <div id='spd_special'>

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

            {/* Level and Nature */}
            <Container id='team_member_level_nature_edit'>
              <div id='level_edit'>
                <Form.Group className='ivev_form'>
                  <Form.Label>Level</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='level' 
                    placeholder={pokeState.pokemon.level ? pokeState.pokemon.level : 'Level'}
                    defaultValue={pokeState.pokemon.level ? pokeState.pokemon.level : 100} 
                    min='1' max='100' ></Form.Control>
                </Form.Group>
              </div>

              <div id='nature_edit'>
                <Form.Group className='ivev_form'>
                  <Form.Label>Nature</Form.Label>
                  <Form.Select 
                    id='nature' 
                    defaultValue={pokeState.pokemon.nature ? pokeState.pokemon.nature : 'bashful'} 
                  >
                    <option value='adamant'>Adamant</option>
                    <option value='bashful'>Bashful</option>
                    <option value='bold'>Bold</option>
                    <option value='brave'>Brave</option>
                    <option value='calm'>Calm</option>
                    <option value='careful'>Careful</option>
                    <option value='docile'>Docile</option>
                    <option value='gentle'>Gentle</option>
                    <option value='hardy'>Hardy</option>
                    <option value='hasty'>Hasty</option>
                    <option value='impish'>Impish</option>
                    <option value='jolly'>Jolly</option>
                    <option value='lax'>Lax</option>
                    <option value='lonely'>Lonely</option>
                    <option value='mild'>Mild</option>
                    <option value='modest'>Modest</option>
                    <option value='naive'>Naive</option>
                    <option value='naughty'>Naughty</option>
                    <option value='quiet'>Quiet</option>
                    <option value='quirky'>Quirky</option>
                    <option value='rash'>Rash</option>
                    <option value='relaxed'>Relaxed</option>
                    <option value='sassy'>Sassy</option>
                    <option value='serious'>Serious</option>
                    <option value='timid'>Timid</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Container>


            <Button type='submit' disabled={disableSubmit}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
    )
}

export default PlaceholderStats;