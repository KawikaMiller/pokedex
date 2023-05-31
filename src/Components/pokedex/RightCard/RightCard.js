import React, { useState } from "react";

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";

import Learnset from "../../moves/LearnSet/Learnset";
import Container from 'react-bootstrap/Container';
import Abilities from "../../abilities/Abilities/Abilities";
import Team from "../../teambuilder/roster/Team/Team";
import PokedexMainRight from "../RightMain/PokedexMainRight"
import { useSelector, useDispatch } from "react-redux";
import pokeSlice from "../../../reduxStore/pokeSlice";
import dexSlice from "../../../reduxStore/dexSlice";
import teamSlice from "../../../reduxStore/teamSlice";
import TeamTypeChart from "../../teambuilder/roster/TypeChart/TeamTypeChart";

function RightCard (props){
  const [activeKey, setActiveKey] = useState(0);
  const [team, setTeam] = useState([]);

  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();

  const { toggleTypeChart } = teamSlice.actions;

  // handles changing the activeKey state property
  const changeTab = (tabIndex) => {
    setActiveKey(tabIndex)
  }

  const addTeamMember = (pokemon) => {
    if (team.length === 6) {
      // add modal pop up, 'team is full'
    } else {
      console.log('yoge')
      setTeam([...team, pokemon])
    }
  }

  const updateTeam = (team) => {
    setTeam(team)
  }

  const removeTeamMember = (idx) => {
    let newTeam = team;
    
    newTeam.splice(idx, 1);

    setTeam(newTeam)
  }
  
  const clearTeam = () => {
    setTeam([])
  }
  
    return(
      <>
      

      <Card bg='danger' style={{justifyContent: 'space-evenly'}}>    
      
        {/* tabs for different functionality of the pokedex */}
        <Card.Header>
          <Nav variant='tabs' defaultActiveKey='0'>
            <Nav.Item>
              <Nav.Link eventKey='0' onClick={() => {changeTab(0)}}>Main</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='1' onClick={() => {changeTab(1)}}>Moves & Abilities</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='2' onClick={() => {changeTab(2)}}>Team Builder</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='3' onClick={() => {changeTab(3)}}>Items</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header> 
        
        <Card.Body id="right_card_body">
          {activeKey === 0 ?
          // if activeKey is 0, display a 'default' pokedex layout
            <PokedexMainRight />
          :   
            false
          }

          
          {activeKey === 1 ?
          // if activeKey is 1, displays moves and abilities
            <Container id='learnset_and_abilities'>

              <Container id="learnset_container">
                {
                  pokeState.pokemon?.name ?
                    <Learnset 
                      key={`${pokeState.pokemon.name}_moves`}
                    /> 
                  : 
                    <h4>Please search for a Pokemon</h4>
                }
              </Container>

              <Container id='abilities_container'>
                {
                  props.searchResult ? 
                    <Abilities
                      key={`${pokeState.pokemon.name}_abilities`} 
                    />
                  : 
                    null  
                }
              </Container>           
            </Container> 
          : 
            null
          }

          {
            activeKey === 2 ?
            // if activeKey is 2, displays team builder
              <Team 
                searchResult={props.searchResult}
                addTeamMember={addTeamMember}
                removeTeamMember={removeTeamMember}
                clearTeam={clearTeam}
                updateTeam={updateTeam} 
                team={team}
              />
            : 
              null
          }

        </Card.Body>

        <Card.Footer>
          {activeKey === 2 ? 
            <Container style={{ display: 'flex', justifyContent: 'space-evenly'}}>
              <Button size='sm' onClick={() => dispatch(toggleTypeChart())}>
                Type Coverage
              </Button>
              <Button size='sm' >
                New Team
              </Button>
              <Button size='sm' >
                Save Team
              </Button>
              <Button size='sm' >
                Load Team
              </Button>         
            </Container>
          :
            null
          }
        </Card.Footer>
    </Card>

    {teamState.showTypeChart ? <TeamTypeChart /> : null}  
    </>
    
    )
}

export default RightCard;