import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import { useSelector, useDispatch } from 'react-redux';
import pokeSlice from '../../../reduxStore/pokeSlice';
import teamSlice from '../../../reduxStore/teamSlice';
import EditPokemon from '../../forms/editPokemon';

import { calculateStatTotal, calculateHpTotal, } from '../../../lib/calcStats';

function TeamMember (props) {

  const [pokemon, setPokemon] = useState(props.pokemon);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const teamState = useSelector(state => state.team);
  let dispatch = useDispatch();
  let { removeFromRoster } = teamSlice.actions;

  const handleToggleNicknameModal = () => {
    setShowNicknameModal(!showNicknameModal)
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
              props.pokemon.nickname ? 
              props.pokemon.nickname
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
              <Button size='sm' onClick={() => setShowEditModal(!showEditModal)}>
                Edit
              </Button>
            </div>

            <div className='team_member_edit_buttons' style={{display: 'flex', justifyContent: 'space-around', padding: '0.25rem'}}>              
              <Button size='sm' variant='danger' onClick={() => dispatch(removeFromRoster(props.rosterIdx))}>
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

      {showEditModal ? 
        <EditPokemon
          idx={props.rosterIdx}
          pokemon={props.pokemon}
          showEditModal={showEditModal}
          toggleModal={() => setShowEditModal(!showEditModal)}  
        />
      : 
        false}

    </>
  )
}

export default TeamMember;