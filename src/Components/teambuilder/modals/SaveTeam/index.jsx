import React, { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from "react-bootstrap/InputGroup";

import { useSelector, useDispatch } from "react-redux";
import teamSlice from "../../../../reduxStore/teamSlice";
import userSlice from "../../../../reduxStore/userSlice";
import { fetchTeamsFromServer, saveTeamToServer } from "../../../../reduxStore/helperFuncs";

function SaveTeamModal(props){
  
  const teamState = useSelector(state => state.team)
  const userState = useSelector(state => state.user)
  const dispatch = useDispatch();
  const { setTeamsName, setFetchedTeams, toggleSaveTeam } = teamSlice.actions

  const loadTeams = () => {
    console.log('yo')
    dispatch(fetchTeamsFromServer())
    .then(response => {
      setFetchedTeams(response.data)
    })
    .catch(err => console.error(err))
  }

  const saveTeam = (event, teamId=undefined) => {
    event.preventDefault();

    if(userState.username){
      dispatch(saveTeamToServer(teamState.teamName, teamState.roster, teamId, userState.username))
      .then(response => console.log('Team Saved', response))
      .catch(error => console.error('Unable to save team', error))      
    } else {
      alert('User must be logged in to save a team')
      console.error('User must be logged in to save a team');
    }
  }

  return(
    <Modal 
      centered 
      show={teamState.showSaveTeam}
      onShow={loadTeams}
      onHide={() => dispatch(toggleSaveTeam())}
      size="lg"
    >
      <Modal.Header>Save Your Team</Modal.Header>
      <Modal.Body style={{display: 'flex'}}>
        <Container>
          <Form onSubmit={() => console.log('submit')}>
            <InputGroup size="sm">
              <InputGroup.Text>Team Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Team Name"
                value={teamState.teamName}
                onChange={(e) => dispatch(setTeamsName(e.target.value))}
                size="sm"
              >
              </Form.Control>            
            </InputGroup>
          </Form>
          <Accordion>
            {
              teamState.roster.map((member, idx) => (
                
                <Accordion.Item eventKey={idx}>
                  <Accordion.Header>{member.nickname ? member.nickname : member.name}</Accordion.Header>
                  <Accordion.Body>
                    Lv. {member.level}
                    {member.stats.map(stat => <p>{stat.name} : {stat.stat_value}</p>)}
                    {member.battleMoves.map(move => <p>{move}</p>)}
                    {member.battleAbility}
                    {member.heldItem}
                    {member.nature}
                    {member.types.map(type => type.type.name)}
                    
                  </Accordion.Body>
                </Accordion.Item>
              ))
            }            
          </Accordion>
        </Container>

        <Container>
          <Accordion>
            {teamState.fetchedTeams.length > 0 ? 
              teamState.fetchedTeams.map((team, idx) => (
                <Accordion.Item eventKey={idx} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: '0.25rem'}}>
                  {team.teamName}
                  <Button size='sm'>Save As</Button>
                </Accordion.Item>
              )) 
              : 
              false
            }
          </Accordion>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' onClick={(e) => console.log(e)}>Save New Team</Button>
      </Modal.Footer>
    </Modal>
  )

}

export default SaveTeamModal;