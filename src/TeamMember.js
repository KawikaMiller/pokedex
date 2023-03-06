import React from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

class TeamMember extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      level: 5
    }
  }

  render(){
    return(
      // <Card className='team_member' style={{color: 'black', backgroundColor: 'skyblue', height: '20vh', maxHeight: '20vh'}}>
      //   <Card.Header className='team_member_header'>{this.props.pokemon.name}</Card.Header>
      //   <Card.Body className='team_member_body'>
      //     <div>
      //       <div style={{backgroundColor: 'white', borderRadius: '50%'}}>
      //         <Card.Img variant='top' src={this.props.pokemon.sprites.front_default}></Card.Img>
      //       </div>
      //       <p style={{margin: '0'}}>Lv. {this.state.level}</p>
      //     </div>
      //     <div style={{width: '100%'}}>
      //       <ProgressBar now={50} variant='success' />
      //     </div>

      //   </Card.Body>
      // </Card>
      <Card className='team_member' style={{color: 'black', backgroundColor: 'skyblue', height: '20vh', maxHeight: '20vh'}}>
      <Card.Header className='team_member_header'>{this.props.pokemon.name}</Card.Header>
      <Card.Body className='team_member_body'>
        <div>
          <div style={{backgroundColor: 'white', borderRadius: '50%'}}>
            <Card.Img variant='top' src={this.props.pokemon.sprites.front_default}></Card.Img>
          </div>
          <p style={{margin: '0'}}>Lv.</p>
        </div>
        <div style={{width: '100%'}}>
          <ProgressBar now={50} variant='success' />
        </div>

      </Card.Body>
    </Card>

    )
  }
}

export default TeamMember;