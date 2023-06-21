import React from 'react';

import TeamMember from '../../TeamMember';
import PlaceholderTeamMember from '../../placeholder/TeamMember';

import Container from 'react-bootstrap/Container';

import { useSelector } from 'react-redux';

function Team (props){
  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);

  // const handleInputChange = (event) => {
  //   if (!event.target.value) {
  //     setTeamName('missingName');
  //   } else {
  //     setTeamName(event.target.value)   
  //   }
  // }

    return(
      <Container style={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%',}}>
        
        {/* displays all team members */}
        <Container id='team_members'>
          <Container style={{padding: '0'}}>
            <h5 style={{verticalAlign: 'middle', margin: '0.5rem 0'}}>
              {`Team Name: ${teamState.teamName}`}
            </h5>
          </Container>
          {teamState.roster.length > 0 ?
          teamState.roster.map((element, idx) => <TeamMember pokemon={element} rosterIdx={idx} />)
          : null }
        </Container>

        {/* placeholder team member before adding pokemon to team */}
        <Container id='team_member_placeholder'>

          {pokeState.pokemon?.name ? 
            <PlaceholderTeamMember key='PlaceholderTeamMember' /> 
          : 
            <h5>Please Search For A Pokemon</h5>
          }

        </Container>        

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
      </Container>

    )
}

export default Team;