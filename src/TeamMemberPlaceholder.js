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
              <p style={{margin: '0'}}>Lv. {this.state.level}</p>
            </div>
          {/* shows stats */}
          <TeamMemberStats stats={this.props.searchResult.stats} key={`${this.props.searchResult.name}_stats`} />
        </Card.Body>
      </Card>
    )
  }
}

export default TeamMemberPlaceholder;