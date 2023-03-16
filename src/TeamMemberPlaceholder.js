import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PlaceholderStats from './PlaceholderStats';

class TeamMemberPlaceholder extends React.Component{
  constructor(props){
    super(props);
    this.props.searchResult.level = 100;
    this.state = {
      pokemon: this.props.searchResult,
      // stats: undefined,
      // nature: 'bashful'
    }
  }

  updateStatValues = (newStats, newLevel, newNature) => {
    let newPokemon = this.props.searchResult;

    newPokemon.stats = newStats;
    newPokemon.level = newLevel;
    newPokemon.nature = newNature;

    this.setState({
      pokemon: newPokemon
    })

    console.log(this.state.pokemon)
  }

// updates and rerenders when props change | props change when searching a new pokemon
  componentDidUpdate(prevProps) {
    
    if (prevProps !== this.props) {
      this.props.searchResult.level = 100;
      this.setState({
        pokemon: this.props.searchResult
      })
    }
  }

  render(){
    return(
      <Card className='member0'>

        <Card.Header className='team_member_header'>
          <Button onClick={() => this.props.addTeamMember(this.state.pokemon)} >+ Add {this.props.searchResult.name}</Button>
        </Card.Header>
        
        <Card.Body className='team_member_body'>
          {/* shows sprite and level */}
            <section id='placeholder_sprite'>
              <Card.Img 
                variant='top' 
                src={this.props.searchResult.sprite.front_default}
                style={{backgroundColor: 'white', borderRadius: '50%'}}
              >
              </Card.Img>
              <p style={{margin: '0'}}>Lv. {this.state.pokemon.level}</p>
            </section>
          {/* shows stats */}
          <PlaceholderStats 
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