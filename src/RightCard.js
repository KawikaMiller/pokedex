import React from "react";

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';


import Learnset from "./moves_abilities/Learnset";
import Container from 'react-bootstrap/Container';
import Abilities from "./moves_abilities/Abilities";
import Team from "./teambuilder/Team";
import PokedexMainRight from "./search_display/PokedexMainRight"



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
          <PokedexMainRight pokemon={this.props.searchResult} />
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