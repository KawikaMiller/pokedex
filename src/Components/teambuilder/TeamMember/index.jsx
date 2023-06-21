import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';

import { useDispatch } from 'react-redux';
import teamSlice from '../../../reduxStore/teamSlice';
import EditPokemon from '../../forms/EditPokemon';

function TeamMember (props) {

  const [showEditModal, setShowEditModal] = useState(false);

  let dispatch = useDispatch();
  let { removeFromRoster } = teamSlice.actions;

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

              <Button size='sm' variant='danger' onClick={() => dispatch(removeFromRoster(props.rosterIdx))}>
                Remove
              </Button>
            </div>

            <ProgressBar now={100} variant='success' style={{margin: '0.25rem'}}/>
          </section>
        </Card.Body>
      </Card>

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