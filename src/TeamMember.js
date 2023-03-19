import React from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
// import { calculateHpTotal, calculateMaxHpTotal, calculateMinHpTotal, calculateStatTotal, calculateMaxStatTotal, calculateMinStatTotal } from './lib/calcStats';

class TeamMember extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pokemon: this.props.pokemon
    }
  }

  render(){
    return(
      <Card className='team_member'>

        <Card.Header className='team_member_header'>
            <h6>{this.state.pokemon.name}</h6>
            {this.state.pokemon.types.map(element => <p>{element.type.name}</p>)}
        </Card.Header>

        <Card.Body className='team_member_body'>
          {/* shows sprite and level */}
          <section className='team_member_sprite'>
              <Card.Img 
                variant='top' 
                src={this.state.pokemon.sprite.front_default}
                style={{backgroundColor: 'white', borderRadius: '50%'}}
              >
              </Card.Img>
              <p style={{margin: '0'}}>Lv. {this.state.pokemon.level}</p>
            </section>
          {/* shows stats */}
          <section className='team_member_info' style={{width: '100%'}}>
            <ProgressBar now={100} variant='success' style={{margin: '0.25rem'}}/>
          </section>

        </Card.Body>
      </Card>

    )
  }
}

export default TeamMember;