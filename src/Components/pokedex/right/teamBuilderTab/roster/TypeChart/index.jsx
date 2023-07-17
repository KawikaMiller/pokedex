import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import TypeBadge from '../../../../../type/Badge';
import TypeChartRow from '../TypeChartRow';
import { useSelector, useDispatch } from 'react-redux';
import teamSlice from '../../../../../../reduxStore/teamSlice';

function TeamTypeChart (props) {

  const allTypes = [
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
        ];
  
  const teamState = useSelector(state => state.team);
  const settingsState = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const {toggleTypeChart} = teamSlice.actions;

  return(
    teamState.roster.length > 0 ?
    <Modal centered show={teamState.showTypeChart} onHide={() => dispatch(toggleTypeChart())} size={'xl'}>
      <Modal.Header className={settingsState.theme} >Type Effectiveness Chart</Modal.Header>
      <Modal.Body>
        <Table id='team_type_chart_table' striped bordered hover size='sm'>
          <thead key='type_chart_tablehead'>
            <tr key='type_chart_headers' id='type_chart_headers'>
              <th></th>{/*intentionally blank*/}
              {allTypes.map(element => (
                <th key={`${element}_header`}>
                  <TypeBadge type={element} />
                </th>
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
        <Button size='sm' className={settingsState.theme} onClick={() => dispatch(toggleTypeChart())}>Close</Button>
      </Modal.Footer>
    </Modal>  
    : 
      null
  )
}

export default TeamTypeChart;