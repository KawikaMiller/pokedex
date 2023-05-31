import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Accordion from 'react-bootstrap/Accordion';
// import Button from 'react-bootstrap/Button';

import TypeChartRow from './TypeChartRow';
import { useSelector, useDispatch } from 'react-redux';
import teamSlice from '../../../../reduxStore/teamSlice';

function TeamTypeChart (props) {
  const [allTypes, setAllTypes] = useState([
          'Normal',
          'Fire',
          'Water',
          'Grass',
          'Electric',
          'Flying',
          'Bug',
          'Rock',
          'Ground',
          'Fighting',
          'Steel',
          'Poison',
          'Ice',
          'Dragon',
          'Ghost',
          'Psychic',
          'Dark',
          'Fairy'
        ])
  
  const teamState = useSelector(state => state.team);
  const dispatch = useDispatch();
  const {toggleTypeChart} = teamSlice.actions;

  return(
    teamState.roster.length > 0 ?
    <Modal centered show={teamState.showTypeChart} onHide={() => dispatch(toggleTypeChart())} size={'xl'}>
      <Modal.Header>Type Effectiveness Chart</Modal.Header>
      <Modal.Body>
        <Table id='team_type_chart_table' striped bordered hover size='sm'>
          <thead key='type_chart_tablehead'>
            <tr key='type_chart_headers' id='type_chart_headers' style={{margin: '0.25rem'}}>
              <th></th>{/*intentionally blank*/}
              {allTypes.map(element => (
                <th key={`${element}_header`}>{element}</th>
              ))}
            </tr>
          </thead>

          <tbody key='type_chart_tablebody'>
            {teamState.roster.map(element => (
              <TypeChartRow typeInfo={element.types} pokemonName={element.name}/>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(toggleTypeChart())}>Close</Button>
      </Modal.Footer>
    </Modal>  
    : 
      null
  )
}

export default TeamTypeChart;