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
        <TeamMemberPlaceholder addTeamMember={this.addTeamMember} searchResult={this.props.searchResult} />

        {this.state.team.length > 0 ?
        this.state.team.map(element => <TeamMember pokemon={element}/>) 
        : null }
      </>

    )
  }
}

export default Team;