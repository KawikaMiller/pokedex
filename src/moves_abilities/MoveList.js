import React from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

class MoveList extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      moves: [],
      sortedByLevel: false,
      sortedByName: false,
      sortedByPower: false,
      sortedByAccuracy: false,
      sortedByPP: false,
      sortedByDmgClass: false,
      sortedByType: false,
    }
  }

  // resets all "sortedBy" state properties to false | the correct property will be set to true in 'handleToggleSort'
  setAllSortedToFalse = () => {
    this.setState({
      sortedByLevel: false,
      sortedByName: false,
      sortedByPower: false,
      sortedByAccuracy: false,
      sortedByPP: false,
      sortedByDmgClass: false,
      sortedByType: false,
    })
  }

  // modular method for all properties
  sortMoves = (arr, property) => {
    arr.sort((a,b) => {
      if(a[property] < b[property]){
        return -1;
      } else if (a[property] > b[property]) {
        return 1;
      } else return 0;
    })
  }

  // one method that can handle all sorting
  handleToggleSort = (thisStateSorted, statePropertyIndex, property) => {
    let stateProperty = Object.keys(this.state)[statePropertyIndex];
    if (thisStateSorted) {
      this.setAllSortedToFalse();
      this.props.moves.reverse();
    }
    else {
      this.setState({
        [stateProperty]: true
      })

      this.sortMoves(this.props.moves, property);
    }
  }

  displayMoves = () => {
    if (this.props.moves.length > 0) {
      return this.props.moves
        .map(element => (
        <tr key={`${this.props.pokemonName}_${element.name}_row`}>
          <td key={`${this.props.pokemonName}_${element.name}_levelLearned`}>{element.levelLearned}</td>
          <td key={`${this.props.pokemonName}_${element.name}`}>{element.name}</td>
          <td key={`${this.props.pokemonName}_${element.name}_power`}>{element.power}</td>
          <td key={`${this.props.pokemonName}_${element.name}_accuracy`}>{element.accuracy}</td>
          <td key={`${this.props.pokemonName}_${element.name}_pp`}>{element.pp}</td>
          <td key={`${this.props.pokemonName}_${element.name}_dmgClass`}>{element.dmgClass}</td>
          <td key={`${this.props.pokemonName}_${element.name}_type`}>{element.type}</td>
        </tr>
        ))
    } else return null;
  }

  render() {
    return(
      <>
      <Accordion.Header >{this.props.header}</Accordion.Header>
      <Accordion.Body style={{overflowY: 'scroll', maxHeight:'33vh'}}>
        <Table striped hover bordered>
          <thead>
            <tr>
              
              <th><Button size='sm' onClick={() => this.handleToggleSort(this.state.sortedByLevel, 1, 'levelLearned')}>Level</Button></th>

              <th><Button size='sm' onClick={() => this.handleToggleSort(this.state.sortedByName, 2, 'name')}>Name</Button></th>

              <th><Button size='sm' onClick={() => this.handleToggleSort(this.state.sortedByPower, 3, 'power')}>Power</Button></th>

              <th><Button size='sm' onClick={() => this.handleToggleSort(this.state.sortedByAccuracy, 4, 'accuracy')}>Accuracy</Button></th>

              <th><Button size='sm' onClick={() => this.handleToggleSort(this.state.sortedByPP, 5, 'pp')}>PP</Button></th>

              <th><Button size='sm' onClick={() => this.handleToggleSort(this.state.sortedByDmgClass, 6, 'dmgClass')}>Damage</Button></th>

              <th><Button size='sm' onClick={() => this.handleToggleSort(this.state.sortedByType, 7, 'type')}>Type</Button></th>

            </tr>
          </thead>
          <tbody>
            {this.displayMoves()}
          </tbody>
        </Table>
      </Accordion.Body>
      </>
    )
  }
}

export default MoveList;

  // old methods, no longer used but preserved for backup just in case

  // sortMovesByLevel = (arr) => {
  //   arr.sort((a,b) => {
  //     if(a.levelLearned < b.levelLearned){
  //       return -1;
  //     } else if (a.levelLearned > b.levelLearned) {
  //       return 1;
  //     } else return 0;
  //   })
  // }

  // handleToggleLevelSort = () => {
  //   if (this.state.sortedByLevel) {
  //     this.setState({
  //       sortedByLevel: true,
  //       sortedByName: false,
  //       sortedByPower: false,
  //       sortedByAccuracy: false,
  //       sortedByPP: false,
  //       sortedByDmgClass: false,
  //       sortedByType: false,
  //     })
  //     this.props.moves.reverse();
  //   }
  //   else {
  //     this.setState({
  //       sortedByLevel: true,
  //       sortedByName: false,
  //       sortedByPower: false,
  //       sortedByAccuracy: false,
  //       sortedByPP: false,
  //       sortedByDmgClass: false,
  //       sortedByType: false,
  //     })

  //     this.sortMoves(this.props.moves, 'levelLearned');

  //   }
  // }