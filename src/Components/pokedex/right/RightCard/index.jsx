import React, { useState } from "react";

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';

import TeamTypeChart from "../teamBuilderTab/roster/TypeChart";
import Team from "../teamBuilderTab/roster/Team";
import RightMainTab from "../mainTab/Main";

import LoadedTeams from "../teamBuilderTab/modals/LoadedTeam";
import SaveTeamModal from "../teamBuilderTab/modals/SaveTeam";
import ItemTab from "../itemTab/ItemTab";

import { useSelector, useDispatch } from "react-redux";
import teamSlice from "../../../../reduxStore/teamSlice";
import { fetchTeamsFromServer } from "../../../../reduxStore/helperFuncs";


function RightCard (props){
  const [activeKey, setActiveKey] = useState(0);
  const [showSaveTeamModal, setShowSaveTeamModal] = useState(false);

  const teamState = useSelector(state => state.team);
  const settingsState = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const { toggleTypeChart, setFetchedTeams, clearRoster, toggleLoadedTeams, toggleSaveTeam } = teamSlice.actions;

  // handles changing the activeKey state property
  const changeTab = (tabIndex) => {
    setActiveKey(tabIndex)
  }

  const loadTeams = () => {
    dispatch(fetchTeamsFromServer())
    .then(response => {
      dispatch(setFetchedTeams(response.data))      
    })
    .then(dispatch(toggleLoadedTeams()))
    .catch(err => console.error(err))
  }

  const toggleSaveTeamModal = () => {
    dispatch(fetchTeamsFromServer())
    .then(response => {
      dispatch(setFetchedTeams(response.data))
    })
    .then(dispatch(toggleSaveTeam()))
    .catch(err => console.error(err))
  }
  
    return(
      <>
      <Card className={`pokedex ${settingsState.theme}`} id='rightcard'>    
      
        {/* tabs for different functionality of the pokedex */}
        <Card.Header>
          <Nav variant='tabs' defaultActiveKey={0}>
            <Nav.Item>
              <Nav.Link className={`rightCardNav ${settingsState.theme}`} eventKey={0} onClick={() => {changeTab(0)}}>Main</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={`rightCardNav ${settingsState.theme}`} eventKey={1} onClick={() => {changeTab(1)}}>Team Builder</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className={`rightCardNav ${settingsState.theme}`} eventKey={2} onClick={() => {changeTab(2)}}>Items</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header> 
        
        <Card.Body id="right_card_body">
          {
            activeKey === 0 ?
            // if activeKey is 0, display a 'default' pokedex layout
              <RightMainTab />
            :   
            activeKey === 1 ?
            // if activeKey is 2, displays team builder
              <Team showSaveTeamModal={showSaveTeamModal} setShowSaveTeamModal={setShowSaveTeamModal} />
            : 
            activeKey === 2 ?
              <ItemTab />
            :
              null
          }

        </Card.Body>

        <Card.Footer>
          {activeKey === 1 ? 
            <Container id='teambuilder_footer'>
              <Button size='sm' className={settingsState.theme} onClick={() => dispatch(toggleTypeChart())}>
                Type Coverage
              </Button>
              <Button size='sm' className={settingsState.theme} onClick={() => dispatch(clearRoster())}>
                New Team
              </Button>
              <Button size='sm' className={settingsState.theme} onClick={toggleSaveTeamModal}>
                Save Team
              </Button>
              <Button size='sm' className={settingsState.theme} onClick={loadTeams}>
                Load Team
              </Button>         
            </Container>
          :
            <Button className='hidden' size="sm">Just Here For Footer Consistency</Button>
          }
        </Card.Footer>
    </Card>

    {teamState.showTypeChart ? <TeamTypeChart /> : null}
    {teamState.showLoadedTeams ? <LoadedTeams /> : null}
    {teamState.showSaveTeam ? <SaveTeamModal /> : null}  
    </>
    
    )
}

export default RightCard;