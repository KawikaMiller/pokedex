import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { calculateStatTotal, calculateHpTotal, } from '../lib/calcStats';

function TeamMember (props) {

  const [pokemon, setPokemon] = useState(props.pokemon);
  const [showMovesModal, setShowMovesModal] = useState(false);
  const [showIvEvModal, setShowIvEvModal] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const handleFormChange = (event) => {
    if (
      parseInt(event.target.form[1].value) +
      parseInt(event.target.form[3].value) +
      parseInt(event.target.form[5].value) +
      parseInt(event.target.form[7].value )+
      parseInt(event.target.form[9].value) +
      parseInt(event.target.form[11].value) > 510 ) {
        setDisableSubmit(true);
      } else {
        setDisableSubmit(false);
      }
  }

  const handleToggleMovesModal = () => {
    setShowMovesModal(!showMovesModal)
  }
  
  const handleToggleIvEvModal = () => {
    setShowIvEvModal(!showIvEvModal)
  }

  const handleToggleNicknameModal = () => {
    setShowNicknameModal(!showNicknameModal)
  }

  const handleSubmitBattleInfo = (event) => {
    event.preventDefault();

    let newPokemon = pokemon;

    newPokemon.battleMoves = [event.target.move_1.value, event.target.move_2.value, event.target.move_3.value, event.target.move_4.value];

    newPokemon.battleAbility = event.target.battle_ability.value;

    newPokemon.heldItem = event.target.held_item.value;

    setPokemon(newPokemon)

    handleToggleMovesModal();
  }

  const handleSubmitIvEvInfo = (event) => {
    event.preventDefault();

    let newPokemon = pokemon;

    newPokemon.stats[0].iv = parseInt(event.target.iv_hp.value)
    newPokemon.stats[0].ev = parseInt(event.target.ev_hp.value)
    newPokemon.stats[0].stat_value = calculateHpTotal(
      pokemon.stats[0].base_stat, 
      parseInt(event.target.iv_hp.value), 
      parseInt(event.target.ev_hp.value), 
      parseInt(event.target.level.value)
    )

    newPokemon.stats[1].iv = parseInt(event.target.iv_atk.value)
    newPokemon.stats[1].ev = parseInt(event.target.ev_atk.value)
    newPokemon.stats[1].stat_value = calculateStatTotal(
      pokemon.stats[1].name,
      pokemon.stats[1].base_stat, 
      parseInt(event.target.iv_atk.value), 
      parseInt(event.target.ev_atk.value), 
      parseInt(event.target.level.value), 
      event.target.nature.value
    )

    newPokemon.stats[2].iv = parseInt(event.target.iv_def.value)
    newPokemon.stats[2].ev = parseInt(event.target.ev_def.value)
    newPokemon.stats[2].stat_value = calculateStatTotal(
      pokemon.stats[2].name,
      pokemon.stats[2].base_stat, 
      parseInt(event.target.iv_def.value), 
      parseInt(event.target.ev_def.value), 
      parseInt(event.target.level.value), 
      event.target.nature.value
    )

    newPokemon.stats[3].iv = parseInt(event.target.iv_spatk.value)
    newPokemon.stats[3].ev = parseInt(event.target.ev_spatk.value)
    newPokemon.stats[3].stat_value = calculateStatTotal(
      pokemon.stats[3].name,
      pokemon.stats[3].base_stat, 
      parseInt(event.target.iv_spatk.value), 
      parseInt(event.target.ev_spatk.value), 
      parseInt(event.target.level.value), 
      event.target.nature.value
    )

    newPokemon.stats[4].iv = parseInt(event.target.iv_spdef.value)
    newPokemon.stats[4].ev = parseInt(event.target.ev_spdef.value)
    newPokemon.stats[4].stat_value = calculateStatTotal(
      pokemon.stats[4].name,
      pokemon.stats[4].base_stat, 
      parseInt(event.target.iv_spdef.value), 
      parseInt(event.target.ev_spdef.value), 
      parseInt(event.target.level.value), 
      event.target.nature.value
    )

    newPokemon.stats[5].iv = parseInt(event.target.iv_spd.value)
    newPokemon.stats[5].ev = parseInt(event.target.ev_spd.value)
    newPokemon.stats[5].stat_value = calculateStatTotal(
      pokemon.stats[5].name,
      pokemon.stats[5].base_stat, 
      parseInt(event.target.iv_spd.value), 
      parseInt(event.target.ev_spd.value), 
      parseInt(event.target.level.value), 
      event.target.nature.value
    )

    newPokemon.level = parseInt(event.target.level.value)
    newPokemon.nature = event.target.nature.value

    setPokemon(newPokemon)

    handleToggleIvEvModal();
  }

  const handleSubmitNickname = (event) => {
    event.preventDefault()

    let newPokemon = pokemon;

    newPokemon.nickname = event.target.pokemon_nickname.value

    setPokemon(newPokemon);

    handleToggleNicknameModal()
  }

  return(
    <>
    <Card 
      className={
        `team_member ${props.pokemon.types.length === 2 ? `${props.pokemon.types[0].type.name} ${props.pokemon.types[1].type.name}` : props.pokemon.types[0].type.name}`
      }
      style={{
        background: props.pokemon.types.length === 2 ?
          `linear-gradient(
            var(--${props.pokemon.types[0].type.name}), var(--${props.pokemon.types[1].type.name})
          )` 
        : 
          `var(--${props.pokemon.types[0].type.name})`,
      }}
    >

      <Card.Header className='team_member_header'>
          <h6>{
            pokemon.nickname ? 
            pokemon.nickname
            :
            (props.pokemon.name[0].toUpperCase() + props.pokemon.name.slice(1))
            }</h6>
          {props.pokemon.types.map(element => <p>{element.type.name}</p>)}
      </Card.Header>

      <Card.Body className='team_member_body'>
        {/* shows sprite and level */}
        <section className='team_member_sprite'>
            <Card.Img 
              variant='top' 
              src={props.pokemon.sprite.front_default}
              style={{backgroundColor: 'white', borderRadius: '50%'}}
            >
            </Card.Img>
            <p style={{margin: '0'}}>Lv. {props.pokemon.level}</p>
        </section>
        {/* shows buttons to edit pokemon info */}
        <section className='team_member_info' style={{width: '100%'}}>

          <div className='team_member_edit_buttons' style={{display: 'flex', justifyContent: 'space-around', padding: '0.25rem'}}>
            <Button size='sm' onClick={handleToggleNicknameModal}>
              Nickname
            </Button>

            <Button size='sm' onClick={handleToggleMovesModal}>
              Battle
            </Button>
          </div>

          <div className='team_member_edit_buttons' style={{display: 'flex', justifyContent: 'space-around', padding: '0.25rem'}}>
            <Button size='sm' onClick={handleToggleIvEvModal}>
              IVs/EVs
            </Button> 
            
            <Button size='sm' variant='danger' onClick={props.removeTeamMember}>
              Remove
            </Button>
          </div>


          <ProgressBar now={100} variant='success' style={{margin: '0.25rem'}}/>
        </section>
      </Card.Body>
    </Card>

    {/* Edit pokemon's nickname */}
    <Modal centered show={showNicknameModal} onHide={handleToggleNicknameModal}>
      <Modal.Header>Edit Nickname</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitNickname}>
          <Form.Group id='pokemon_nickname_form'>
            <Form.Label>Nickname</Form.Label>
            <Form.Control type='text' placeholder='Enter a nickname...' id='pokemon_nickname' minLength={1} maxLength={12} />
            <Button type='submit'>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>

    {/* Battle Moves, Ability, Held Item */}
    <Modal centered show={showMovesModal} onHide={handleToggleMovesModal}>
      <Modal.Header>
        Edit Pokemon Info
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmitBattleInfo}>
          <Form.Group id='battle_moves' className='battle_moves_form'>
            <Container style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div>
                  <Form.Label>Ability</Form.Label>
                  <Form.Select id='battle_ability'>
                    {props.pokemon.abilities.map(element => (
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
                    {props.pokemon.moves.map(element => (
                      <option value={element.name}>{element.name}</option>
                    ))}
                  </Form.Select>                    
                </div>
                
                <div>
                  <Form.Label>Move 2</Form.Label>
                  <Form.Select id="move_2">
                    {props.pokemon.moves.map(element => (
                      <option value={element.name}>{element.name}</option>
                    ))}
                  </Form.Select>                     
                </div>
              </div>

              <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div>
                  <Form.Label>Move 3</Form.Label>
                  <Form.Select id='move_3'>
                    {props.pokemon.moves.map(element => (
                      <option value={element.name}>{element.name}</option>
                    ))}
                  </Form.Select>                    
                </div>
                
                <div>
                  <Form.Label>Move 4</Form.Label>
                  <Form.Select id='move_4'>
                    {props.pokemon.moves.map(element => (
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

      <Modal.Footer>
        footer
      </Modal.Footer>
    </Modal>

    {/* IVs, EVs, Level, Nature */}
    <Modal centered show={showIvEvModal} onHide={handleToggleIvEvModal}>
      <Modal.Header>Edit IVs & EVs</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitIvEvInfo} onChange={handleFormChange}>  
          <Container id='team_member_stats_edit'>
            {/* HP, ATK, DEF */}
            <div id='hp_phys'>

              {/* HP IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>HP</Form.Label>
                <Form.Control 
                  type="number" 
                  id='iv_hp' 
                  placeholder={pokemon.stats[0].iv ? pokemon.stats[0].iv : 'IVs'}
                  defaultValue={pokemon.stats[0].iv ? pokemon.stats[0].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_hp' 
                  placeholder={pokemon.stats[0].ev ? pokemon.stats[0].ev : 'EVs'}
                  defaultValue={pokemon.stats[0].ev ? pokemon.stats[0].ev : 0} 
                  min='0' max='255' ></Form.Control>
              </Form.Group>

              {/* Attack IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>ATK</Form.Label>
                <Form.Control 
                  type="number" 
                  id='iv_atk' 
                  placeholder={pokemon.stats[1].iv ? pokemon.stats[1].iv : 'IVs'}
                  defaultValue={pokemon.stats[1].iv ? pokemon.stats[1].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_atk' 
                  placeholder={pokemon.stats[1].ev ? pokemon.stats[1].ev : 'EVs'}
                  defaultValue={pokemon.stats[1].ev ? pokemon.stats[1].ev : 0} 
                  min='0' max='255' ></Form.Control>
              </Form.Group>

              {/* Defense IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>DEF</Form.Label>
                <Form.Control 
                  type="number" 
                  id='iv_def' 
                  placeholder={pokemon.stats[2].iv ? pokemon.stats[2].iv : 'IVs'}
                  defaultValue={pokemon.stats[2].iv ? pokemon.stats[2].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_def' 
                  placeholder={pokemon.stats[2].ev ? pokemon.stats[2].ev : 'EVs'}
                  defaultValue={pokemon.stats[2].ev ? pokemon.stats[2].ev : 0}  
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
                  placeholder={pokemon.stats[3].iv ? pokemon.stats[3].iv : 'IVs'}
                  defaultValue={pokemon.stats[3].iv ? pokemon.stats[3].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_spatk' 
                  placeholder={pokemon.stats[3].ev ? pokemon.stats[3].ev : 'EVs'}
                  defaultValue={pokemon.stats[3].ev ? pokemon.stats[3].ev : 0} 
                  min='0' max='255' ></Form.Control>
              </Form.Group>

              {/* Special Defense IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>SPDEF</Form.Label>
                <Form.Control 
                  type="number" 
                  id='iv_spdef' 
                  placeholder={pokemon.stats[4].iv ? pokemon.stats[4].iv : 'IVs'}
                  defaultValue={pokemon.stats[4].iv ? pokemon.stats[4].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_spdef' 
                  placeholder={pokemon.stats[4].ev ? pokemon.stats[4].ev : 'EVs'}
                  defaultValue={pokemon.stats[4].ev ? pokemon.stats[4].ev : 0} 
                  min='0' max='255'></Form.Control>
              </Form.Group>

              {/* Speed IV and EV */}
              <Form.Group className='ivev_form'>
                <Form.Label>SPD</Form.Label>
                <Form.Control 
                  type="number" 
                  id='iv_spd' 
                  placeholder={pokemon.stats[5].iv ? pokemon.stats[5].iv : 'IVs'}
                  defaultValue={pokemon.stats[5].iv ? pokemon.stats[5].iv : 0} 
                  min='0' max='31' ></Form.Control>
                <Form.Control 
                  type="number" 
                  id='ev_spd' 
                  placeholder={pokemon.stats[5].ev ? pokemon.stats[5].ev : 'EVs'}
                  defaultValue={pokemon.stats[5].ev ? pokemon.stats[5].ev : 0} 
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
                  placeholder={pokemon.level ? pokemon.level : 'Level'}
                  defaultValue={pokemon.level ? pokemon.level : 100} 
                  min='1' max='100' ></Form.Control>
              </Form.Group>
            </div>

            <div id='nature_edit'>
              <Form.Group className='ivev_form'>
                <Form.Label>Nature</Form.Label>
                <Form.Select 
                  id='nature' 
                  defaultValue={pokemon.nature ? pokemon.nature : 'bashful'} 
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
          <Container style={{display: 'flex', justifyContent: 'space-between'}}>
            <Button type='submit' disabled={disableSubmit}>Submit</Button>
            {disableSubmit ? <span>EV totals must be 510 or less</span> : null}              
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default TeamMember;