import axios from 'axios';
import React from 'react';

import TeamMember from './TeamMember';
import PlaceholderTeamMember from './PlaceholderTeamMember';
import TeamTypeChart from './TeamTypeChart';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

class Team extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      team: this.props.team,
      showTypeCoverage: false,
    }
  }

  toggleTypeCoverageModal = () => {
    this.setState({
      showTypeCoverage: !this.state.showTypeCoverage
    })
  }

  // addTeamMember = (pokemon) => {
  //   if (this.state.team.length === 6) {
  //     // add modal pop up, 'team is full'
  //   } else {
  //     console.log(pokemon);
  //     this.setState({
  //       team: [...this.state.team, pokemon]
  //     })
  //   }
  // }

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

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        team: this.props.team
      })
    }
  }

  componentDidMount() {
    this.setState({
      team: this.props.team
    })

    console.log('')
  }

  render(){
    return(
      <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%'}}>
        <Container id='team_member_placeholder'>
          {this.props.searchResult ? 
          <PlaceholderTeamMember addTeamMember={this.props.addTeamMember} searchResult={this.props.searchResult} key='PlaceholderTeamMember' />
          : null }
        </Container>
        
        <Container id='team_members'>
          {this.state.team.length > 0 ?
          this.state.team.map((element, idx) => <TeamMember pokemon={element} removeTeamMember={() => this.props.removeTeamMember(idx)} />)
          : null }
        </Container>
        

        <Modal
          className='team_type_chart_modal' 
          centered 
          size='xl' 
          show={this.state.showTypeCoverage} 
          onHide={this.toggleTypeCoverageModal}
        >
          <Modal.Header>Team Type Coverage</Modal.Header>
          <Modal.Body>
            <TeamTypeChart key='team_type_chart' team={this.state.team} />
          </Modal.Body>

        </Modal>
        {/* <Container id='team_type_chart_container'>
          <TeamTypeChart key='team_type_chart' team={this.state.team} />
        </Container> */}

        <div>
          <Button onClick={this.toggleTypeCoverageModal}>
            Type Coverage
          </Button>
          <Button onClick={this.saveTeamToDB}>
            Save Team
          </Button>
        </div>

      </Container>

    )
  }
}

export default Team;