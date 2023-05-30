import axios from 'axios';
import React, { useState, useEffect } from 'react';

import TeamMember from '../../teammember/TeamMember';
import PlaceholderTeamMember from '../../placeholder/TeamMember/PlaceholderTeamMember';
import TeamTypeChart from '../TypeChart/TeamTypeChart';
// import { Move } from './lib/pokemon';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

import { useSelector } from 'react-redux';
import teamSlice from '../../../../reduxStore/teamSlice';

function Team (props){
  const [team, setTeam] = useState(props.team);
  const [teamName, setTeamName] = useState('missingName');
  const [teamId, setTeamId] = useState(undefined);
  const [loadedTeams, setLoadedTeams] = useState([]);
  const [showTypeCoverage, setShowTypeCoverage] = useState(false);
  const [showLoadedTeams, setShowLoadedTeams] = useState(false);
  const [showSaveTeamModal, setShowSaveTeamModal] = useState(false);

  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);

  let { addToRoster, removeFromRoster, clearRoster, overwriteRoster, setTeamsName } = teamSlice.actions;

  // handles hiding and showing the type coverage chart
  const toggleTypeCoverageModal = () => {
    setShowTypeCoverage(!showTypeCoverage)
  }

  // handles hiding and showing the list of teams able to be loaded
  const toggleLoadedTeamsModal = () => {
    setShowLoadedTeams(!showLoadedTeams)
  }

  // handles hiding and showing the modal for naming a team when saving
  const toggleSaveTeamModal = async () => {

    if (showSaveTeamModal === false) {
      try {
        let response = await axios.get(`${process.env.REACT_APP_SERVER}/teams`);
        setLoadedTeams(response.data)
      } catch(error) {
        console.log(error, ` | error getting teams from database`)
      }
    }

    setShowSaveTeamModal(!showSaveTeamModal)
  }

  // gets all teams from the database > once authentication is implemented this will need to be refactored to only return the specific user's teams
  const listTeamsFromDB = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_SERVER}/teams`);
      setLoadedTeams(response.data)
      toggleLoadedTeamsModal();
    } catch(error) {
      console.log(error, ` | error getting teams from database`)
    }
  }

  // gets one specific team from the database
  const loadTeam = async (teamId) => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_SERVER}/team?id=${teamId}`
      )
      props.updateTeam(response.data.pokemon);
      setTeamName(response.data.teamName);
      setTeamId(response.data._id);
    } catch (err) {
      console.log(err, ' | error loading team from database')
    }

    toggleLoadedTeamsModal()
  }

  // saves a new team to the database
  const saveTeamToDB = (event) => {
    event.preventDefault();

    let request = {
      teamName: teamName,
      pokemon: team
    };

    axios
      .post(`${process.env.REACT_APP_SERVER}/teams`, request)
      .then(response => {
        setTeamId(response.data._id);
      })
      .catch(err => {console.log(err)})

      toggleSaveTeamModal();
  }

  // overwrites an existing team in the database
  const overwriteTeamInDB = async (event) => {
    event.preventDefault();

    let request;

    // if there is no change to the team name, then we do not update it on the db
    if (!event.target.team_form_name.value) {
      request = {
        pokemon: team,
        id: event.target.existing_team.value
      }
    }
    // if a new team name has been supplied, then we update the team name in the db
    else {
      request = {
        teamName: event.target.team_form_name.value,
        pokemon: team,
        id: event.target.existing_team.value
      }      
    }

    axios
      .put(`${process.env.REACT_APP_SERVER}/teams/${event.target.existing_team.value}`, request)
      .then(response => {
        setTeamId(response.data._id)
      })
      .catch(err => {console.log(err)})

      toggleSaveTeamModal();
  }

  // deletes a team from the database
  const deleteTeamFromDB = async (teamId) => {
    try {
      axios
        .delete(`${process.env.REACT_APP_SERVER}/teams/${teamId}`);     
    } catch (err) {
      console.log(err)
    } finally {
      let response = await axios.get(`${process.env.REACT_APP_SERVER}/teams`);
      setLoadedTeams(response.data)
    }
  }

  // clears team and teamId state to prep for a new team
  const newTeam = () => {
    props.clearTeam();
    setTeamId(undefined);
    setTeamName('missingName');
  }

  const handleInputChange = (event) => {
    if (!event.target.value) {
      setTeamName('missingName');
    } else {
      setTeamName(event.target.value)   
    }
  }


  useEffect(() => {
    setTeam(props.team)
  }, [props])


  useEffect(() => {
    setTeam(props.team)
  }, [])


    return(
      <Container style={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%',}}>

        {/* placeholder team member before adding pokemon to team */}
        <Container id='team_member_placeholder'>

          {pokeState.pokemon?.name ? 
          <h5>Search Result</h5> 
          : 
          <h5>Please Search For A Pokemon</h5>
          }

          {pokeState.pokemon?.name ? 
          <PlaceholderTeamMember 
          addTeamMember={props.addTeamMember} 
          searchResult={pokeState.pokemon} key='PlaceholderTeamMember' 
          />
          : 
          null
          }
          
        </Container>
        
        {/* displays all team members */}
        <Container id='team_members'>
          <Container style={{padding: '0'}}>
            <h5 style={{verticalAlign: 'middle', margin: '0.5rem 0'}}>
              {`Team Name: ${teamName}`}
            </h5>
          </Container>
          {teamState.roster.length > 0 ?
          teamState.roster.map((element, idx) => <TeamMember pokemon={element} rosterIdx={idx} />)
          : null }
        </Container>
        
        {/* displays team type coverage chart */}
        {/* <Modal
          className='team_type_chart_modal' 
          centered 
          size='xl' 
          show={showTypeCoverage} 
          onHide={toggleTypeCoverageModal}
        >
          <Modal.Header>Team Type Coverage</Modal.Header>
          <Modal.Body>
            <TeamTypeChart key='team_type_chart' team={team} />
          </Modal.Body>
        </Modal> */}

        {/* displays input to name a team before saving */}
        {/* <Modal show={showSaveTeamModal} onHide={toggleSaveTeamModal} centered>
          <Modal.Header>Save Your Team</Modal.Header>          
          {team.length > 0 ? 
            <Modal.Body>
              <Container style={{margin: '1rem 0'}}>
                <Form onSubmit={saveTeamToDB}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h5>Create A New Team</h5>
                    <Button size='sm' type='submit'>
                      Submit
                    </Button>                
                  </div>
                  <Form.Group id='save_team_form'>
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control 
                      type='text' 
                      minLength={1} 
                      maxLength={15} 
                      id='team_form_name'
                      placeholder='Enter team name..'
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Form>              
              </Container>
              <br></br>
              <Container style={{margin: '1rem 0'}}>
                <Form onSubmit={overwriteTeamInDB}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h5>Overwrite An Existing Team</h5>
                    <Button size='sm' type='submit'>
                      Submit
                    </Button>                
                  </div>
                  <Form.Group id='save_team_form'>
                    <Form.Label>Team Name</Form.Label>
                    <Form.Control 
                      type='text' 
                      minLength={1} 
                      maxLength={15} 
                      id='team_form_name'
                      placeholder='Enter team name..'
                      onChange={handleInputChange}
                    />
                    <Form.Text className="text-muted">
                      Leave this blank to keep same team name
                    </Form.Text>
                    <br></br>
                    <Form.Label>Team to Overwrite</Form.Label>
                    <Form.Select id='existing_team'>
                      {loadedTeams.map(element => (
                        <option value={element.id}>{element.teamName}</option>
                      ))}
                    </Form.Select>                  
                  </Form.Group>
                </Form>
              </Container>
            </Modal.Body>
          : 
            <Modal.Body>
              <h6>Please add at least one member to your team</h6>
            </Modal.Body>}


        </Modal> */}

        {/* "Load Team" | displays list of saved teams */}
        {/* <Modal
          centered
          className='loaded_teams_list'
          show={showLoadedTeams}
          onHide={toggleLoadedTeamsModal}  
        >
          <Modal.Header>Your Teams</Modal.Header>

          <Modal.Body>
            <Accordion>
              {loadedTeams.length > 0 ?
                loadedTeams.map((element, idx) => (
                  <Accordion.Item eventKey={idx}>
                    <Accordion.Header>{element.teamName}</Accordion.Header>
                    <Accordion.Body>
                      <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button onClick={() => loadTeam(element.id)}>
                          Load Team
                        </Button>
                        <Button variant='danger' onClick={() => deleteTeamFromDB(element.id)}>
                          Delete Team
                        </Button>                        
                      </div>

                    </Accordion.Body>
                  </Accordion.Item>
                ))
              :
                null
              }
            </Accordion>

          </Modal.Body>

          <Modal.Footer>Footer</Modal.Footer>
        </Modal> */}

        {/* buttons at bottom */}
        {/* <Container style={{ position: 'absolute', bottom: '0%', width: '100%'}}>
          <Container style={{ display: 'flex', justifyContent: 'space-evenly'}}>
            <Button size='sm' onClick={toggleTypeCoverageModal}>
              Type Coverage
            </Button>
            <Button size='sm' onClick={newTeam}>
              New Team
            </Button>
            <Button size='sm' onClick={toggleSaveTeamModal}>
              Save Team
            </Button>
            <Button size='sm' onClick={listTeamsFromDB}>
              Load Team
            </Button>            
          </Container>

        </Container> */}

      </Container>

    )
}

export default Team;