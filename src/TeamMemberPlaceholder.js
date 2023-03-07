import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Stat from './Stat';
import TeamMemberStats from './TeamMemberStats';

class TeamMemberPlaceholder extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      pokemon: this.props.searchResult,
      stats: undefined,
    }
  }

  updateStatValues = (newStats) => {
    let newPokemon = this.props.searchResult;

    newPokemon.stats = newStats;

    this.setState({
      pokemon: newPokemon
    })

    console.log(this.state.pokemon)
  }

  // componentDidMount() {
  //   {this.state.pokemon === undefined ? 
  //     this.setState({
  //       pokemon: this.props.searchResult
  //     })
  //     : 
  //     this.setState({
  //       pokemon: this.state.pokemon
  //     })
  //   }
  // }

  render(){
    return(
      <Card className='member0'>

        <Card.Header className='team_member_header'>
          <Button onClick={() => this.props.addTeamMember(this.props.searchResult)} >+ Add {this.props.searchResult.name}</Button>
        </Card.Header>
        
        <Card.Body className='team_member_body'>
          {/* shows sprite and level */}
            <div>
              <Card.Img variant='top' src={this.props.searchResult.sprites.front_default} style={{backgroundColor: 'white', borderRadius: '50%'}}></Card.Img>
              <p style={{margin: '0'}}>Lv. {this.state.level}</p>
            </div>
          {/* shows stats */}
          <TeamMemberStats 
            stats={this.state.pokemon.stats} 
            key={`${this.state.pokemon.name}_stats`}
            updateStatValues={this.updateStatValues} 
          />
        </Card.Body>
      </Card>
    )
  }
}

export default TeamMemberPlaceholder;