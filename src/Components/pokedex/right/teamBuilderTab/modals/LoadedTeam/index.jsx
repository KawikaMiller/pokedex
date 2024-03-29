import React from "react";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import { useSelector, useDispatch } from "react-redux";
import teamSlice from "../../../../../../reduxStore/teamSlice";
import { loadTeamToClient, deleteTeamInServer } from "../../../../../../reduxStore/helperFuncs";

function LoadedTeams() {

  const teamState = useSelector(state => state.team);
  const settingsState = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const {toggleLoadedTeams, setRoster, setFetchedTeams} = teamSlice.actions;

  const loadTeam = (teamId) => {
    dispatch(loadTeamToClient(teamId))
    .then(response => {
      dispatch(setRoster(response.data))
    })
    .then(() => {
      dispatch(toggleLoadedTeams());
    })
    .catch(err => console.error(err));
  }

  const deleteTeam = (teamId) => {
    dispatch(deleteTeamInServer(teamId))
    .then(response => {
      dispatch(setFetchedTeams(response.data))
    })
    .catch(err => console.error(err))
  }

  return(
      <Modal
        centered
        className='loaded_teams_list'
        show={teamState.showLoadedTeams}
        onHide={() => dispatch(toggleLoadedTeams())}  
      >
        <Modal.Header className={settingsState.theme}>Your Teams</Modal.Header>

        <Modal.Body>
          <Accordion>
            {teamState.fetchedTeams.length > 0 ?
              teamState.fetchedTeams.map((element, idx) => (
                <Accordion.Item className={settingsState.theme} eventKey={idx}>
                  <Accordion.Header className={settingsState.theme}>{element.teamName}</Accordion.Header>
                  <Accordion.Body>
                    <div id='load_teams_options'>
                      <Button className={settingsState.theme} onClick={() => loadTeam(element.id)}>
                        Load Team
                      </Button>
                      <Button variant='danger' onClick={() => deleteTeam(element.id)}>
                        Delete Team
                      </Button>                        
                    </div>

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
  )

}

export default LoadedTeams;