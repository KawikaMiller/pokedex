import React from 'react';
import Card from 'react-bootstrap/Card';
import PlaceholderStats from './PlaceholderStats';

class PlaceholderTeamMember extends React.Component{
  constructor(props){
    super(props);
    this.props.searchResult.level = 100;
    this.state = {
      pokemon: this.props.searchResult,
    }
  }

  updateStats = (newStats, newLevel, newNature) => {
    let newPokemon = this.state.pokemon;

    newPokemon.stats = newStats;
    newPokemon.level = newLevel;
    newPokemon.nature = newNature;

    this.setState({
      pokemon: newPokemon
    })
  }

  updateBattleInfo = (battleMovesArr, battleAbility, heldItem) => {
    let newPokemon = this.state.pokemon;

    console.log('updating battle info')

    newPokemon.battleMoves = battleMovesArr;
    newPokemon.battleAbility = battleAbility;
    newPokemon.heldItem = heldItem;

    this.setState({
      pokemon: newPokemon
    })
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

        <Card.Body className='team_member_body'>

          {/* shows sprite and level */}
            <section id='placeholder_sprite'>
              <Card.Img 
                variant='top' 
                src={this.props.searchResult.sprite.front_default}
                style={{backgroundColor: 'white', borderRadius: '50%', width: '90%'}}
              >
              </Card.Img>
              <p style={{margin: '0'}}>Lv. {this.state.pokemon.level}</p>
            </section>

          {/* shows stats */}
          <PlaceholderStats
            moves={this.state.pokemon.moves}
            abilities={this.state.pokemon.abilities} 
            stats={this.state.pokemon.stats}
            nature={this.state.pokemon.nature}
            level={100} 
            key={`${this.state.pokemon.name}_stats`}
            updateStats={this.updateStats}
            updateBattleInfo={this.updateBattleInfo}
            addTeamMember={() => this.props.addTeamMember(this.state.pokemon)} 
            name={this.props.searchResult.name[0].toUpperCase() + this.props.searchResult.name.slice(1)}
          />

        </Card.Body>
      </Card>
    )
  }
}

export default PlaceholderTeamMember;