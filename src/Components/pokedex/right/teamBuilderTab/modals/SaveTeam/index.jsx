import React from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from "react-bootstrap/InputGroup";
import Table from 'react-bootstrap/Table';

import { useSelector, useDispatch } from "react-redux";
import teamSlice from "../../../../../../reduxStore/teamSlice";
import { fetchTeamsFromServer, saveTeamToServer } from "../../../../../../reduxStore/helperFuncs";

import '../../../../../../style/saveTeamModal.css'

function SaveTeamModal(props){
  
  const teamState = useSelector(state => state.team)
  const userState = useSelector(state => state.user)
  const settingsState = useSelector(state => state.settings)
  const dispatch = useDispatch();
  const { setTeamsName, setFetchedTeams, toggleSaveTeam } = teamSlice.actions

  const loadTeams = () => {
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
      <Modal.Header style={{display: 'flex', justifyContent: 'space-between'}}>
        Save Your Team 
        <p style={{margin: '0', color: 'grey', fontSize: '0.9rem'}}>{teamState.roster.length > 0 ? '' : 'Team must have at least one member'}</p>
      </Modal.Header>
      <Modal.Body style={{display: 'flex'}}>
        <Container>
          <Form id='teamSave'>
            <InputGroup size="sm">
              <InputGroup.Text>Team Name</InputGroup.Text>
              <Form.Control
                name="teamName"
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
              teamState.roster.map((pokemon, idx) => (
                
                <Accordion.Item eventKey={idx}>
                  <Accordion.Header>
                    {`${pokemon.nickname ? pokemon.nickname : pokemon.name}`}
                    <Button className={settingsState.theme} size='sm' style={{visibility: 'hidden'}}>Hidden for style consistency</Button>
                  </Accordion.Header>
                  <Accordion.Body >
                    <Container style={{padding: '0', display: 'flex', justifyContent: 'space-between'}}>
                      <Container className='innerContainer'>
                        {/* <p><span><strong>Level: </strong>{pokemon.level}</span></p> */}
                        <p><span><strong>Held Item: </strong>{pokemon.heldItem}</span></p>
                        <p><span><strong>Nature: </strong>{pokemon.nature}</span></p>
                        <p><span><strong>Ability: </strong>{pokemon.battleAbility}</span></p>
                        <p><span><strong>Types: </strong>{pokemon.types.map(type => (` ${type.type.name}`))}</span></p>               
                      </Container>
                      
                      <Container className='innerContainer' >
                        <Table striped bordered>
                          <thead>
                            <tr>
                              <th colSpan={2}>Moves</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{pokemon.battleMoves[0]}</td>
                              <td>{pokemon.battleMoves[1]}</td>
                            </tr>
                            <tr>
                              <td>{pokemon.battleMoves[2]}</td>
                              <td>{pokemon.battleMoves[3]}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Container>
                    </Container>
                    <Table bordered striped>
                      <thead>
                        <tr>
                          <th>Stat</th>
                          <th>Value</th>
                          <th>EV</th>
                          <th>IV</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{pokemon.stats[0].name}</td>
                          <td>{pokemon.stats[0].stat_value}</td>
                          <td>{pokemon.stats[0].ev}</td>
                          <td>{pokemon.stats[0].iv}</td>
                        </tr>
                        <tr>
                          <td>{pokemon.stats[1].name}</td>
                          <td>{pokemon.stats[1].stat_value}</td>
                          <td>{pokemon.stats[1].ev}</td>
                          <td>{pokemon.stats[1].iv}</td>
                        </tr>
                        <tr>
                          <td>{pokemon.stats[2].name}</td>
                          <td>{pokemon.stats[2].stat_value}</td>
                          <td>{pokemon.stats[2].ev}</td>
                          <td>{pokemon.stats[2].iv}</td>
                        </tr>
                        <tr>
                          <td>{pokemon.stats[3].name}</td>
                          <td>{pokemon.stats[3].stat_value}</td>
                          <td>{pokemon.stats[3].ev}</td>
                          <td>{pokemon.stats[3].iv}</td>
                        </tr>
                        <tr>
                          <td>{pokemon.stats[4].name}</td>
                          <td>{pokemon.stats[4].stat_value}</td>
                          <td>{pokemon.stats[4].ev}</td>
                          <td>{pokemon.stats[4].iv}</td>
                        </tr>
                        <tr>
                          <td>{pokemon.stats[5].name}</td>
                          <td>{pokemon.stats[5].stat_value}</td>
                          <td>{pokemon.stats[5].ev}</td>
                          <td>{pokemon.stats[5].iv}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            }            
          </Accordion>
        </Container>

        <Container>
          <InputGroup size='sm' id='savedTeams'>
            <InputGroup.Text >Saved Teams</InputGroup.Text>
          </InputGroup>
          <Accordion>
            {teamState.fetchedTeams.length > 0 ? 
              teamState.fetchedTeams.map((team, idx) => (
                <Accordion.Item eventKey={idx} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: '0.25rem'}}>
                  {team.teamName}
                  <Button className={settingsState.theme} size='sm' disabled={teamState.roster.length > 0 ? false : true} onClick={(event) => saveTeam(event, team.id)}>Save As</Button>
                </Accordion.Item>
              )) 
              : 
              false
            }
          </Accordion>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className={settingsState.theme} 
          disabled={teamState.roster.length > 0 ? false : true} 
          type='submit' 
          onClick={saveTeam}
        >
          Save New Team
        </Button>
      </Modal.Footer>
    </Modal>
  )

}

export default SaveTeamModal;