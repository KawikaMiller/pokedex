import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

function MoveList (props) {

  const [sortedByLevel, setSortedByLevel] = useState(false);
  const [sortedByName, setSortedByName] = useState(false);
  const [sortedByPower, setSortedByPower] = useState(false);
  const [sortedByAccuracy, setSortedByAccuracy] = useState(false);
  const [sortedByPP, setSortedByPP] = useState(false);
  const [sortedByDmgClass, setSortedByDmgClass] = useState(false);
  const [sortedByType, setSortedByType] = useState(false);

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
      if(a[property] < b[property]){
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else return 0;
    })
  }

  // one method that can handle all sorting
  const handleToggleSort = (thisStateSorted, setSorted, property) => {
    // let stateProperty = Object.keys(this.state)[statePropertyIndex];
    if (thisStateSorted) {
      setAllSortedToFalse();
      props.moves.reverse();
    }
    else {
      setSorted();
      sortMoves(props.moves, property);
    }
  }

  const displayMoves = () => {
    if (props.moves.length > 0) {
      return props.moves
        .map(element => (
        <tr>
          <td>{element.levelLearned}</td>
          <td>{element.name}</td>
          <td>{element.power}</td>
          <td>{element.accuracy}</td>
          <td>{element.pp}</td>
          <td>{element.dmgClass}</td>
          <td>{element.type}</td>
        </tr>
        ))
    } else return null;
  }

  useEffect(() => {
    if(props.disableLevelLearned) {
      if(Array.isArray(props.moves)){
        sortMoves(props.moves, 'name')
      }
    }
    else{
      if(Array.isArray(props.moves)){
        sortMoves(props.moves, 'levelLearned')
      }
    }

  }, [props])

  return(
    <>
    <Accordion.Header >{props.header}</Accordion.Header>
    <Accordion.Body style={{overflowY: 'scroll', height:'35vh'}}>
      <Table striped hover bordered>
        <thead>
          <tr>
            
            {props.disableLevelLearned === true ? 
              <th><Button disabled size='sm' onClick={() => handleToggleSort(sortedByLevel, () => setSortedByLevel(true), 'levelLearned')}>Level</Button></th>
            : 
              <th><Button size='sm' onClick={() => handleToggleSort(sortedByLevel, () => setSortedByLevel(true), 'levelLearned')}>Level</Button></th>
            }


            <th><Button size='sm' onClick={() => handleToggleSort(sortedByName, () => setSortedByName(true), 'name')}>Name</Button></th>

            <th><Button size='sm' onClick={() => handleToggleSort(sortedByPower, () => setSortedByPower(true), 'power')}>Power</Button></th>

            <th><Button size='sm' onClick={() => handleToggleSort(sortedByAccuracy, () => setSortedByAccuracy(true), 'accuracy')}>Acc</Button></th>

            <th><Button size='sm' onClick={() => handleToggleSort(sortedByPP, () => setSortedByPP(true), 'pp')}>PP</Button></th>

            <th><Button size='sm' onClick={() => handleToggleSort(sortedByDmgClass, () => setSortedByDmgClass(true), 'dmgClass')}>Damage</Button></th>

            <th><Button size='sm' onClick={() => handleToggleSort(sortedByType, () => setSortedByType(true), 'type')}>Type</Button></th>

          </tr>
        </thead>
        <tbody>
          {displayMoves()}
        </tbody>
      </Table>
    </Accordion.Body>
    </>
  )
}

export default MoveList;