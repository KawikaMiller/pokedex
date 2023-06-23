import React from 'react';

import TeamMember from '../../TeamMember';
import PlaceholderTeamMember from '../../placeholder/TeamMember';

import Container from 'react-bootstrap/Container';

import { useSelector } from 'react-redux';

function Team (props){
  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);

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
      </Container>

    )
}

export default Team;