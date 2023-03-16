import axios from 'axios';
import React from 'react';
import TeamMember from './TeamMember';
import TeamMemberPlaceholder from './TeamMemberPlaceholder';
import Button from 'react-bootstrap/Button'
import { Pokemon } from './lib/pokemon';


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
      // console.log(pokemon);
      const teamMember = new Pokemon (
        pokemon.name, 
        pokemon.id, 
        pokemon.level, 
        pokemon.nature, 
        pokemon.abilities, 
        [], 
        pokemon.sprites.front_default, 
        pokemon.stats, 
        pokemon.types
      );
      console.log(teamMember);
      // this.setState({
      //   team: [...this.state.team, teamMember]
      // })
    }
  }

  saveTeamToDB = () => {
    let request = {
      teamName: 'testTeam',
      slot1: this.state.team[0],
      slot2: this.state.team[1],
      slot3: this.state.team[2],
      slot4: this.state.team[3],
      slot5: this.state.team[4],
      slot6: this.state.team[5],
    };
    console.log(request);
    axios
      .post(`${process.env.REACT_APP_SERVER}/teams`, request)
      .then(response => {
        console.log(response);
      })
      .catch(err => {console.log(err)})
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

        <Button onClick={this.saveTeamToDB}>
          Save Team
        </Button>
      </>

    )
  }
}

export default Team;