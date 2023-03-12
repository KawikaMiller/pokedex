import React from 'react';
import TeamMember from './TeamMember';
import TeamMemberPlaceholder from './TeamMemberPlaceholder';


class Team extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      team: [],
    }
  }

  addTeamMember = (pokemon) => {
    if (this.state.team.length === 6) {
      // add modal pop up, 'team is full'
    } else {
      this.setState({
        team: [...this.state.team, pokemon]
      })
    }

  }

  render(){
    return(
      <>
        <section id='team_member_placeholder'>
          {this.props.searchResult ? 
          <TeamMemberPlaceholder addTeamMember={this.addTeamMember} searchResult={this.props.searchResult} key='teamMemberPlaceholder' />
          : null }
        </section>
        
        <section id='team_members'>

          {this.state.team.length > 0 ?
          this.state.team.map(element => <TeamMember pokemon={element}/>) 
          : null }
        </section>

      </>

    )
  }
}

export default Team;