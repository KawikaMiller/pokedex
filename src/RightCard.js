import React from "react";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Learnset from "./moves_abilities/Learnset";
import Container from 'react-bootstrap/Container';
import Abilities from "./moves_abilities/Abilities";
import Team from "./teambuilder/Team";
import { CardGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

class RightCard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      //activeKey dictates what 'tab' is open on the right side of the pokedex
      activeKey: 0,
      team: [],
    }
  }

  // handles changing the activeKey state property
  changeTab(tabIndex) {
    this.setState({
      activeKey: tabIndex
    })
  }

  addTeamMember = (pokemon) => {
    if (this.state.team.length === 6) {
      // add modal pop up, 'team is full'
    } else {
      this.setState({
        team: [...this.state.team, pokemon]
      })
    }
  }

  setTeam = (team) => {
    this.setState({
      team: team
    })
  }

  removeTeamMember = (idx) => {
    let newTeam = this.state.team;
    
    newTeam.splice(idx, 1);

    this.setState({
      team: newTeam,
    })
  }
  
  clearTeam = () => {
    this.setState({
      team: []
    })
  }

  componentDidUpdate() {

  }

  componentDidMount() {

  }
  

  render() {
    return(
      <Card bg='danger' style={{justifyContent: 'space-evenly'}}>    
      
      {/* tabs for different functionality of the pokedex */}
      <Card.Header>
        <Nav variant='tabs' defaultActiveKey='0'>
          <Nav.Item>
            <Nav.Link eventKey='0' onClick={() => {this.changeTab(0)}}>Main</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='1' onClick={() => {this.changeTab(1)}}>Moves & Abilities</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='2' onClick={() => {this.changeTab(2)}}>Team Builder</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='3' onClick={() => {this.changeTab(3)}}>Items</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header> 
      
      {/* conditionally renders different components based on tab selected */}
      <Card.Body id="right_card_body">

        {/* if activeKey is 0, display a 'default' pokedex layout */}
        {this.state.activeKey === 0 ?
          <>
            {/* black rectangle near top for displaying text */}
            <Container style={{width: '80%', height: '25%', backgroundColor: 'rgb(25, 25, 25)', marginTop: '6rem'}}>
              <p>GET request to https://pokeapi.co/api/v2/pokemon-species/pokemon-name-or-id</p>
              <p>Then get pokedex entry + various information and display it here </p>
            </Container>

            {/* 10 blue buttons */}
            <Container style={{width: '80%', marginTop: '2rem', padding: '0'}}>
              <CardGroup>

                <Card bg='primary'>
                  <Card.Header>
                    1
                  </Card.Header>
                  <Card.Footer>
                    1
                  </Card.Footer>
                </Card>

                <Card bg='primary'>
                  <Card.Header>
                    2
                  </Card.Header>
                  <Card.Footer>
                    2
                  </Card.Footer>
                </Card>

                <Card bg='primary'>
                  <Card.Header>
                    3
                  </Card.Header>
                  <Card.Footer>
                    3
                  </Card.Footer>
                </Card>

                <Card bg='primary'>
                  <Card.Header>
                    4
                  </Card.Header>
                  <Card.Footer>
                    4
                  </Card.Footer>
                </Card>

                <Card bg='primary'>
                  <Card.Header>
                    5
                  </Card.Header>
                  <Card.Footer>
                    5
                  </Card.Footer>
                </Card>

              </CardGroup>
            </Container>


            <Container style={{width: '80%', marginTop: '1rem', padding: '0'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', float: 'right', width: '40%', padding: '0'}}>
                <Button style={{width: '47.5%'}}></Button>
                <Button style={{width: '47.5%'}}></Button>                
              </div>
            </Container>

            <Container style={{width: '80%', marginTop: '1rem', padding: '0' }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{width: '40%', height: '5rem'}}>
                  <CardGroup style={{height: '100%'}}>
                    <Card>
                      1
                    </Card>
                    <Card>
                      2
                    </Card>
                  </CardGroup>
                </div>
                <div>
                  <div style={{backgroundColor: 'gold', width: '4rem', height: '4rem', borderRadius: '50%'}}>

                  </div>
                </div>
              </div>
            </Container>

            <Container style={{width: '80%', height: '10%', marginTop: '3rem', padding: '0'}}>
                <CardGroup style={{display: 'flex', justifyContent: 'space-between', height: '100%'}}>
                  <Card style={{backgroundColor: 'grey', width: '40%', margin: '0 2rem 0 0'}}>

                  </Card>
                  <Card style={{backgroundColor: 'grey', width: '40%', margin: '0 0 0 2rem'}}>

                  </Card>
                </CardGroup> 
            </Container>       
          </> 

        : 
          false
        }

        {/* if activeKey is 1, displays moves and abilities */}
        {this.state.activeKey === 1 ?
          <Container id='learnset_and_abilities'>
            {/* displays all the moves, categorized by learn method */}
            <Container id="learnset_container">
              {
                this.props.searchResult ?
                  <Learnset 
                    moves={this.props.searchResult.moves} 
                    pokemonName={this.props.searchResult.name} 
                    key={`${this.props.searchResult.name}_moves`}
                  /> 
                : 
                  <h4>Please search for a Pokemon</h4>
              }
            </Container>          
            {/* displays the pokemon's abilities */}
            <Container id='abilities_container'>
              {
                this.props.searchResult ? 
                  <Abilities 
                    abilities={this.props.searchResult.abilities} 
                  />
                : 
                  null  
              }
            </Container>           
          </Container> 
          : null
        }

        {/* if activeKey is 2, displays team builder */}
        {
          this.state.activeKey === 2 ?
              <Team 
                searchResult={this.props.searchResult}
                addTeamMember={this.addTeamMember}
                removeTeamMember={this.removeTeamMember}
                clearTeam={this.clearTeam}
                setTeam={this.setTeam} 
                team={this.state.team}
              />
          : 
            null
        }

      </Card.Body>

      <Card.Footer>

      </Card.Footer>
    </Card>
    )
  }
}

export default RightCard;