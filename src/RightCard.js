import React from "react";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Learnset from "./Learnset";
import Container from 'react-bootstrap/Container';
import Abilities from "./Abilities";
import Team from "./Team";

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
      console.log(pokemon);
      this.setState({
        team: [...this.state.team, pokemon]
      })
    }
  }

  removeTeamMember = (idx) => {
    let newTeam = this.state.team;
    
    newTeam.splice(idx, 1);

    this.setState({
      team: newTeam,
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
            <Nav.Link eventKey='0' onClick={() => {this.changeTab(0)}}>Moves & Abilities</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='1' onClick={() => {this.changeTab(1)}}>Team Builder</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header> 
      
      {/* conditionally renders different components based on tab selected */}
      <Card.Body id="right_card_body">

        {/* if activeKey is 0, displays moves and abilities */}
        {this.state.activeKey === 0 ?
          <>
            {/* displays all the moves, categorized by learn method */}
            <Container id="moves_container">
              {
                this.props.searchResult ?
                  <Learnset 
                    moves={this.props.searchResult.moves} 
                    pokemonName={this.props.searchResult.name} 
                    key={`${this.props.searchResult.name}_moves`}
                  /> 
                : 
                  null
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
          </> 
          : null
        }

        {/* if activeKey is 1, displays team builder */}
        {
          this.state.activeKey === 1 ?
              <Team 
                searchResult={this.props.searchResult}
                addTeamMember={this.addTeamMember}
                removeTeamMember={this.removeTeamMember} 
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