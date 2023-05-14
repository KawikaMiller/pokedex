import React, { useEffect, useState } from 'react';
import Stat from './Stat';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { calculateStatTotal, calculateHpTotal, } from '../lib/calcStats';

function PlaceholderStats(props) {
  const [level, setLevel] = useState(props.level);
  const [stats, setStats] = useState(props.stats);
  const [nature, setNature] = useState('bashful');
  const [showMovesModal, setShowMovesModal] = useState(false);
  const [showIvEvModal, setShowIvEvModal] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

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

    let newStats = stats;

    newStats[0].iv = parseInt(event.target.iv_hp.value)
    newStats[0].ev = parseInt(event.target.ev_hp.value)
    newStats[0].stat_value = calculateHpTotal(
      stats[0].base_stat, 
      parseInt(event.target.iv_hp.value), 
      parseInt(event.target.ev_hp.value), 
      parseInt(event.target.level.value)
    )

    newStats[1].iv = parseInt(event.target.iv_atk.value)
    newStats[1].ev = parseInt(event.target.ev_atk.value)
    newStats[1].stat_value = calculateStatTotal(
      stats[1].name,
      stats[1].base_stat, 
      parseInt(event.target.iv_atk.value), 
      parseInt(event.target.ev_atk.value), 
      parseInt(event.target.level.value), 
      event.target.nature.value
    )

    newStats[2].iv = parseInt(event.target.iv_def.value)
    newStats[2].ev = parseInt(event.target.ev_def.value)
    newStats[2].stat_value = calculateStatTotal(
      stats[2].name,
      stats[2].base_stat, 
      parseInt(event.target.iv_atk.value), 
      parseInt(event.target.ev_atk.value), 
      parseInt(event.target.level.value), 
      event.target.nature.value
    )

    newStats[3].iv = parseInt(event.target.iv_spatk.value)
    newStats[3].ev = parseInt(event.target.ev_spatk.value)
    newStats[3].stat_value = calculateStatTotal(
      stats[3].name,
      stats[3].base_stat, 
      parseInt(event.target.iv_atk.value), 
      parseInt(event.target.ev_atk.value), 
      parseInt(event.target.level.value), 
      event.target.nature.value
    )

    newStats[4].iv = parseInt(event.target.iv_spdef.value)
    newStats[4].ev = parseInt(event.target.ev_spdef.value)
    newStats[4].stat_value = calculateStatTotal(
      stats[4].name,
      stats[4].base_stat, 
      parseInt(event.target.iv_atk.value), 
      parseInt(event.target.ev_atk.value), 
      parseInt(event.target.level.value), 
      event.target.nature.value
    )

    newStats[5].iv = parseInt(event.target.iv_spd.value)
    newStats[5].ev = parseInt(event.target.ev_spd.value)
    newStats[5].stat_value = calculateStatTotal(
      stats[5].name,
      stats[5].base_stat, 
      parseInt(event.target.iv_atk.value), 
      parseInt(event.target.ev_atk.value), 
      parseInt(event.target.level.value), 
      event.target.nature.value
    )

    // sends updated stat values back to placeholder component
    props.updateStats(newStats, parseInt(event.target.level.value), event.target.nature.value);

    setLevel(parseInt(event.target.level.value));
    setStats(newStats);
    setNature(event.target.nature.value)
  
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

    props.updateBattleInfo(battleMovesArr, event.target.battle_ability.value, event.target.held_item.value)

    handleHideMovesModal()
  }


  useEffect(() => {
    props = props;
  },
  props)

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps !== props) {
  //     return true;
  //   }
  // }

    return(
      <>
      <Container className='team_member_stats' >

        <div className='stats_sub_phys'>
          <Stat 
            stat={stats[0]} 
            level={level}
            nature={nature} />
          <Stat 
            stat={stats[1]} 
            level={level}
            nature={nature} />
          <Stat 
            stat={stats[2]} 
            level={level}
            nature={nature} />
        </div>

        <div className='stats_sub_spec'>
          <Stat 
            stat={stats[3]} 
            level={level}
            nature={nature} />
          <Stat 
            stat={stats[4]} 
            level={level}
            nature={nature} />
          <Stat 
            stat={stats[5]} 
            level={level}
            nature={nature} />
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
            onClick={props.addTeamMember} 
          >
          + To Team
          </Button>
        </div>
      </Container>

      <Modal centered show={showMovesModal} onHide={handleHideMovesModal} >
        {sortMoves(props.moves)}
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
                      {props.abilities.map(element => (
                        <option value={element.name}>{element.ability.name}</option>
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
                      {props.moves.map(element => (
                        <option value={element.name}>{element.name}</option>
                      ))}
                    </Form.Select>                    
                  </div>
                  
                  <div>
                    <Form.Label>Move 2</Form.Label>
                    <Form.Select id="move_2">
                      {props.moves.map(element => (
                        <option value={element.name}>{element.name}</option>
                      ))}
                    </Form.Select>                     
                  </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <div>
                    <Form.Label>Move 3</Form.Label>
                    <Form.Select id='move_3'>
                      {props.moves.map(element => (
                        <option value={element.name}>{element.name}</option>
                      ))}
                    </Form.Select>                    
                  </div>
                  
                  <div>
                    <Form.Label>Move 4</Form.Label>
                    <Form.Select id='move_4'>
                      {props.moves.map(element => (
                        <option value={element.name}>{element.name}</option>
                      ))}
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
                    placeholder={stats[0].iv ? stats[0].iv : 'IVs'}
                    defaultValue={stats[0].iv ? stats[0].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_hp' 
                    placeholder={stats[0].ev ? stats[0].ev : 'EVs'}
                    defaultValue={stats[0].ev ? stats[0].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                {/* Attack IV and EV */}
                <Form.Group className='ivev_form'>
                  <Form.Label>ATK</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_atk' 
                    placeholder={stats[1].iv ? stats[1].iv : 'IVs'}
                    defaultValue={stats[1].iv ? stats[1].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_atk' 
                    placeholder={stats[1].ev ? stats[1].ev : 'EVs'}
                    defaultValue={stats[1].ev ? stats[1].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                {/* Defense IV and EV */}
                <Form.Group className='ivev_form'>
                  <Form.Label>DEF</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_def' 
                    placeholder={stats[2].iv ? stats[2].iv : 'IVs'}
                    defaultValue={stats[2].iv ? stats[2].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_def' 
                    placeholder={stats[2].ev ? stats[2].ev : 'EVs'}
                    defaultValue={stats[2].ev ? stats[2].ev : 0}  
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
                    placeholder={stats[3].iv ? stats[3].iv : 'IVs'}
                    defaultValue={stats[3].iv ? stats[3].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spatk' 
                    placeholder={stats[3].ev ? stats[3].ev : 'EVs'}
                    defaultValue={stats[3].ev ? stats[3].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                {/* Special Defense IV and EV */}
                <Form.Group className='ivev_form'>
                  <Form.Label>SPDEF</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_spdef' 
                    placeholder={stats[4].iv ? stats[4].iv : 'IVs'}
                    defaultValue={stats[4].iv ? stats[4].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spdef' 
                    placeholder={stats[4].ev ? stats[4].ev : 'EVs'}
                    defaultValue={stats[4].ev ? stats[4].ev : 0} 
                    min='0' max='255'></Form.Control>
                </Form.Group>

                {/* Speed IV and EV */}
                <Form.Group className='ivev_form'>
                  <Form.Label>SPD</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_spd' 
                    placeholder={stats[5].iv ? stats[5].iv : 'IVs'}
                    defaultValue={stats[5].iv ? stats[5].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spd' 
                    placeholder={stats[5].ev ? stats[5].ev : 'EVs'}
                    defaultValue={stats[5].ev ? stats[5].ev : 0} 
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
                    placeholder={level ? level : 'Level'}
                    defaultValue={level ? level : 100} 
                    min='1' max='100' ></Form.Control>
                </Form.Group>
              </div>

              <div id='nature_edit'>
                <Form.Group className='ivev_form'>
                  <Form.Label>Nature</Form.Label>
                  <Form.Select 
                    id='nature' 
                    defaultValue={nature ? nature : 'bashful'} 
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