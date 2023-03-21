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
      loadedTeams: [],
      showTypeCoverage: false,
      showLoadedTeams: false,
    }
  }

  toggleTypeCoverageModal = () => {
    this.setState({
      showTypeCoverage: !this.state.showTypeCoverage
    })
  }

  toggleLoadedTeamsModal = () => {
    this.setState({
      showLoadedTeams: !this.state.showLoadedTeams
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

  listTeamsFromDB = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_SERVER}/teams`);
      console.log(response);
      this.setState({
        loadedTeams: response.data,
      })
      this.toggleLoadedTeamsModal();
    } catch(error) {
      console.log(error, ` | error getting teams from database`)
    }
  }

  loadTeam = async (teamId) => {
    console.log(teamId);
    try {
      let response = await axios.get(`${process.env.REACT_APP_SERVER}/team?id=${teamId}`);

      // console.log(response.data)

      this.setState({
        team: response.data.pokemon
      })

    } catch (err) {
      console.log(err, ' | error loading team from database')
    }

    this.toggleLoadedTeamsModal()
  }

  saveTeamToDB = () => {
    let request = {
      teamName: 'newTestTeam',
      pokemon: this.state.team

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
  }

  render(){
    return(
      <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%'}}>

        {/* placeholder team member before adding pokemon to team */}
        <Container id='team_member_placeholder'>
          {this.props.searchResult ? 
          <PlaceholderTeamMember addTeamMember={this.props.addTeamMember} searchResult={this.props.searchResult} key='PlaceholderTeamMember' 
          />
          : null }
        </Container>
        
        {/* displays all team members */}
        <Container id='team_members'>
          {this.state.team.length > 0 ?
          this.state.team.map((element, idx) => <TeamMember pokemon={element} removeTeamMember={() => this.props.removeTeamMember(idx)} />)
          : null }
        </Container>
        
        {/* displays team type coverage chart */}
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

        {/* displays list of saved teams */}
        <Modal
          centered
          className='loaded_teams_list'
          show={this.state.showLoadedTeams}
          onHide={this.toggleLoadedTeamsModal}  
        >
          <Modal.Header>Your Teams</Modal.Header>

          <Modal.Body>
            {this.state.loadedTeams.length > 0 ?
              this.state.loadedTeams.map(element => (
                <Button onClick={() => this.loadTeam(element.id)}>
                  {element.teamName}
                </Button>
              ))
            :
              null
            }
          </Modal.Body>

          <Modal.Footer>Footer</Modal.Footer>
        </Modal>
  

        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Button onClick={this.toggleTypeCoverageModal}>
            Type Coverage
          </Button>
          <Button onClick={this.saveTeamToDB}>
            Save Team
          </Button>
          <Button onClick={this.listTeamsFromDB}>
            Load Team
          </Button>
        </div>

      </Container>

    )
  }
}

export default Team;