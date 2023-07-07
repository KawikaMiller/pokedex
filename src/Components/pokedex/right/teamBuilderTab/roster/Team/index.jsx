import React from 'react';

import TeamMember from '../../TeamMember';
import PlaceholderTeamMember from '../../placeholder/TeamMember';

import Container from 'react-bootstrap/Container';

import { useSelector } from 'react-redux';

function Team (props){
  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);

    return(
      <Container id='team_container'>
        
        {/* displays all team members */}
        <Container id='team_members'>
          <Container id='team_name_container'>
            <h5 id='team_name'>
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