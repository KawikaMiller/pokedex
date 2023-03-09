import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TeamMemberStats from './TeamMemberStats';

class TeamMemberPlaceholder extends React.Component{
  constructor(props){
    super(props);
    this.props.searchResult.level = 100;
    this.state = {
      pokemon: this.props.searchResult,
      stats: undefined,
    }
  }

  updateStatValues = (newStats, newLevel) => {
    let newPokemon = this.props.searchResult;

    newPokemon.stats = newStats;
    newPokemon.level = newLevel;

    this.setState({
      pokemon: newPokemon
    })

    console.log(this.state.pokemon)
  }

// updates and rerenders when props change | props change when searching a new pokemon
  componentDidUpdate(prevProps) {
    
    if (prevProps !== this.props) {
      this.setState({
        pokemon: this.props.searchResult
      })
    }
  }

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
              <p style={{margin: '0'}}>Lv. {this.state.pokemon.level}</p>
            </div>
          {/* shows stats */}
          <TeamMemberStats 
            stats={this.state.pokemon.stats}
            level={100} 
            key={`${this.state.pokemon.name}_stats`}
            updateStatValues={this.updateStatValues} 
          />
        </Card.Body>
      </Card>
    )
  }
}

export default TeamMemberPlaceholder;