import axios from 'axios';
import React from 'react';

import TeamMember from './TeamMember';
import PlaceholderTeamMember from './PlaceholderTeamMember';
import TeamTypeChart from './TeamTypeChart';
// import { Move } from './lib/pokemon';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

class Team extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      team: this.props.team,
      teamName: 'missingName',
      teamId: undefined,
      loadedTeams: [],
      showTypeCoverage: false,
      showLoadedTeams: false,
      showTeamName: false,
    }
  }

  // handles hiding and showing the type coverage chart
  toggleTypeCoverageModal = () => {
    this.setState({
      showTypeCoverage: !this.state.showTypeCoverage
    })
  }

  // handles hiding and showing the list of teams able to be loaded
  toggleLoadedTeamsModal = () => {
    this.setState({
      showLoadedTeams: !this.state.showLoadedTeams
    })
  }

  // handles hiding and showing the modal for naming a team when saving
  toggleTeamNameModal = () => {
    this.setState({
      showTeamName: !this.state.showTeamName
    })
  }

  // gets all teams from the database > once authentication is implemented this will need to be refactored to only return the specific user's teams
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

  // gets one specific team from the database
  loadTeam = async (teamId) => {
    console.log(teamId);
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_SERVER}/team?id=${teamId}`
      )

        this.setState({
          team: response.data.pokemon,
          teamName: response.data.teamName,
          teamId: response.data._id
        })     

    } catch (err) {
      console.log(err, ' | error loading team from database')
    }

    this.toggleLoadedTeamsModal()
  }

  // saves a new team to the database
  saveTeamToDB = (event) => {
    event.preventDefault();

    let request = {
      teamName: this.state.teamName,
      pokemon: this.state.team

    };

    axios
      .post(`${process.env.REACT_APP_SERVER}/teams`, request)
      .then(response => {
        console.log(response);
      })
      .catch(err => {console.log(err)})

      this.toggleTeamNameModal();
  }

  deleteTeamFromDB = async (teamId) => {
    try {
      axios
        .delete(`${process.env.REACT_APP_SERVER}/teams/${teamId}`);

      let response = await axios.get(`${process.env.REACT_APP_SERVER}/teams`);
      this.setState({
        loadedTeams: response.data,
      })      
    } catch (err) {
      console.log(err)
    }
  }

  handleInputChange = (event) => {
    this.setState({
      teamName: event.target.value
    })
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

        {/* displays input to name a team before saving */}
        <Modal show={this.state.showTeamName} onHide={this.toggleTeamNameModal} centered>
          <Modal.Header>Save Your Team</Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.saveTeamToDB}>
              <Form.Group id='save_team_form'>
                <Form.Label>Team Name</Form.Label>
                <Form.Control 
                  type='text' 
                  min={1} 
                  max={15} 
                  id='team_form_name'
                  placeholder='Enter team name..'
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Button type='submit' onClick={this.saveTeamToDB}>
                Submit
              </Button>
            </Form>
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
            <Accordion>
              {this.state.loadedTeams.length > 0 ?
                this.state.loadedTeams.map((element, idx) => (
                  <Accordion.Item eventKey={idx}>
                    <Accordion.Header>{element.teamName}</Accordion.Header>
                    <Accordion.Body>
                      <Button onClick={() => this.loadTeam(element.id)}>
                        Load Team
                      </Button>
                      <Button onClick={() => this.deleteTeamFromDB(element.id)}>
                        Delete Team
                      </Button>
                    </Accordion.Body>
                  </Accordion.Item>
                ))
              :
                null
              }
            </Accordion>

          </Modal.Body>

          <Modal.Footer>Footer</Modal.Footer>
        </Modal>

        {/* buttons at bottom */}
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Button onClick={this.toggleTypeCoverageModal}>
            Type Coverage
          </Button>
          <Button onClick={this.toggleTeamNameModal}>
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

// below code not currently used but keeping just in case

// .then(res => {
//   console.log('.then on load team | ', res)

//   res.data.pokemon.forEach(async element => {
//     axios
//     .get(`https://pokeapi.co/api/v2/pokemon/${element.name}`)

//     .then(res2 => {

//       let movesArr = [];

//       res2.data.moves.forEach(move => {
//         move.version_group_details.forEach(vgDetail => {
//           if (vgDetail.version_group.name === 'scarlet-violet') {
//             movesArr.push(new Move(
//               move.move.name, 
//               vgDetail.level_learned_at,
//               vgDetail.move_learn_method.name,
//             ))
//           }
//         })
//       })

//       if (movesArr.length === 0) {
//         res2.data.moves.forEach(move => {
//           move.version_group_details.forEach(vgDetail => {
//             if(vgDetail.version_group.name === 'sword-shield') {
//               movesArr.push(new Move(
//                 move.move.name, 
//                 vgDetail.level_learned_at,
//                 vgDetail.move_learn_method.name,
//               ))
//             }
//           })
//         })
//       }
//       element.moves = movesArr;
//       return element;
//     })
//     .then(res2 => {
//       res2.moves.forEach(async move => {
//         try {
//           let request = {
//             url: `https://pokeapi.co/api/v2/move/${move.name}`,
//             method: 'GET'
//           }
          
//           let res = await axios(request);

//           move.power = res.data.power;
//           move.accuracy = res.data.accuracy;
//           move.pp = res.data.pp;
//           move.priority = res.data.priority;
//           move.dmgClass = res.data.damage_class.name;
//           move.type = res.data.type.name;
//         } catch (err) {
//           console.log(err)
//         }
//       })
//     })
//   })
//   return res
// })
// console.log(response.data);