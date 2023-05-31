import React from "react";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import { useSelector, useDispatch } from "react-redux";
import teamSlice from "../../../../reduxStore/teamSlice";
import { loadTeamToClient } from "../../../../reduxStore/helperFuncs";

function LoadedTeams() {

  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const {toggleLoadedTeams, setRoster} = teamSlice.actions;

  const loadTeam = (teamId) => {
    dispatch(loadTeamToClient(teamId))
    .then(response => {
      dispatch(setRoster(response.data))
    })
    .then(response => {
      dispatch(toggleLoadedTeams());
    })
    .catch(err => console.error(err));
  }

  return(
      <Modal
        centered
        className='loaded_teams_list'
        show={teamState.showLoadedTeams}
        onHide={() => dispatch(toggleLoadedTeams())}  
      >
        <Modal.Header>Your Teams</Modal.Header>

        <Modal.Body>
          <Accordion>
            {teamState.fetchedTeams.length > 0 ?
              teamState.fetchedTeams.map((element, idx) => (
                <Accordion.Item eventKey={idx}>
                  <Accordion.Header>{element.teamName}</Accordion.Header>
                  <Accordion.Body>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                      <Button onClick={() => loadTeam(element.id)}>
                        Load Team
                      </Button>
                      <Button variant='danger' >
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