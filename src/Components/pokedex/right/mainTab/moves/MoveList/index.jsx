import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import { useSelector } from 'react-redux';

function MoveList (props) {

  const [sortedByLevel, setSortedByLevel] = useState(false);
  const [sortedByName, setSortedByName] = useState(false);
  const [sortedByPower, setSortedByPower] = useState(false);
  const [sortedByAccuracy, setSortedByAccuracy] = useState(false);
  const [sortedByPP, setSortedByPP] = useState(false);
  const [sortedByDmgClass, setSortedByDmgClass] = useState(false);
  const [sortedByType, setSortedByType] = useState(false);
  const [sortAsc, setSortAsc] = useState(false);

  const settingsState = useSelector(state => state.settings);

  // resets all "sortedBy" state properties to false | the correct property will be set to true in 'handleToggleSort'
  const setAllSortedToFalse = () => {
    setSortedByLevel(false);
    setSortedByName(false);
    setSortedByPower(false);
    setSortedByAccuracy(false);
    setSortedByPP(false);
    setSortedByDmgClass(false);
    setSortedByType(false);
  }

  // modular method for all properties
  const sortMoves = (arr, property) => {
    arr.sort((a,b) => {
      // console.log(typeof a[property], typeof b[property])
      if(a[property] < b[property]){
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else return 0;
    })
  }

  // one method that can handle all sorting
  const handleToggleSort = (thisStateSorted, setSorted, property) => {
    setAllSortedToFalse();
    setSorted();
    if (thisStateSorted) {
      setSortAsc(!sortAsc)
      props.moves.reverse();
    }
    else {
      setSortAsc(false);
      sortMoves(props.moves, property);
    }
  }

  const displayMoves = () => {
    if (props.moves.length > 0) {
      return props.moves
        .map((element, idx) => (
        <Accordion.Item eventKey={`${idx}`} className={settingsState.theme}>
          <Accordion.Header  className={`${settingsState.theme} accordion_move_header`}>
            <Table bordered className={settingsState.theme}>
              <tbody>
                <tr>
                  <td>{element.levelLearned}</td>
                  <td>{element.name}</td>
                  <td>{element.power}</td>
                  <td>{element.accuracy}</td>
                  <td>{element.pp}</td>
                  <td>{element.dmgClass}</td>
                  <td>{element.type}</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Header>
          <Accordion.Body className='move_description'>
            <p>{element.description}</p>
          </Accordion.Body>
        </Accordion.Item>
        ))
    } else return null;
  }

  return(
  <Accordion className='movelist_accordion'>
    <Accordion.Item className='movelist_header' >
      <Table>
        <thead>
          <tr>
            <th>
              <Button 
                className={`movelist_button ${settingsState.theme}`}
                disabled={props.disableLevelLearned ? true : false} 
                variant='primary' 
                size='sm' 
                onClick={() => handleToggleSort(sortedByLevel, () => setSortedByLevel(true), 'levelLearned')}
              >
                Level {
                  sortedByLevel ? 
                    sortAsc ? 
                      '▲' 
                      : 
                      '▼'
                    :
                    null
                }
              </Button>
            </th>

            <th>
              <Button 
                className={`movelist_button ${settingsState.theme}`} 
                variant='primary' 
                size='sm' 
                onClick={() => handleToggleSort(sortedByName, () => setSortedByName(true), 'name')}
              >
                Name {
                  sortedByName ? 
                    sortAsc ? 
                      '▲' 
                      : 
                      '▼'
                    :
                    null
                }
              </Button>
            </th>

            <th>
              <Button 
                className={`movelist_button ${settingsState.theme}`} 
                variant='primary' 
                size='sm' 
                onClick={() => handleToggleSort(sortedByPower, () => setSortedByPower(true), 'power')}
              >
                Power {
                  sortedByPower ? 
                    sortAsc ? 
                      '▲' 
                      : 
                      '▼'
                    :
                    null
                }
              </Button>
            </th>

            <th>
              <Button 
                className={`movelist_button ${settingsState.theme}`} 
                variant='primary' 
                size='sm' 
                onClick={() => handleToggleSort(sortedByAccuracy, () => setSortedByAccuracy(true), 'accuracy')}
              >
                Acc {
                  sortedByAccuracy ? 
                    sortAsc ? 
                      '▲' 
                      : 
                      '▼'
                    :
                    null
                }
              </Button>
            </th>

            <th>
              <Button 
                className={`movelist_button ${settingsState.theme}`} 
                variant='primary' 
                size='sm' 
                onClick={() => handleToggleSort(sortedByPP, () => setSortedByPP(true), 'pp')}
              >
                PP {
                  sortedByPP ? 
                    sortAsc ? 
                      '▲' 
                      : 
                      '▼'
                    :
                    null
                }
              </Button>
            </th>

            <th>
              <Button 
                className={`movelist_button ${settingsState.theme}`} 
                variant='primary' 
                size='sm' 
                onClick={() => handleToggleSort(sortedByDmgClass, () => setSortedByDmgClass(true), 'dmgClass')}
              >
                Dmg {
                  sortedByDmgClass ? 
                    sortAsc ? 
                      '▲' 
                      : 
                      '▼'
                    :
                    null
                }
              </Button>
            </th>

            <th>
              <Button 
                className={`movelist_button ${settingsState.theme}`}
                variant='primary' 
                size='sm' 
                onClick={() => handleToggleSort(sortedByType, () => setSortedByType(true), 'type')}
              >
                Type {
                  sortedByType ? 
                    sortAsc ? 
                      '▲' 
                      : 
                      '▼'
                    :
                    null
                }
              </Button>
            </th>
          </tr>
        </thead>
      </Table>
    </Accordion.Item>
    {displayMoves()}
  </Accordion>
  )
}

export default MoveList;