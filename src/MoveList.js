import React from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

class MoveList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      levelUpMoves: [],
      tmMoves: [],
      tutorMoves: [],
      eggMoves: [],
      sortedByLevel: true,
      sortedByName: false,
      sortedByPower: false,
      sortedByAccuracy: false,
    }
  }

  //TODO: Add methods for sorting the remaining move properties, add "sortedBy(property)" to state, refactor all "handleToggle(property)Sort" in the else > this.setState section

  // accuracy sorting
  sortMovesByAccuracy = (arr) => {
    arr.sort((a,b) => {
      if (a.accuracy === null && b.accuracy) {
        return -1
      } else if (a.accuracy && b.accuracy === null) {
        return 1
      } else if (!a.accuracy && !b.accuracy) {
        return 0
      } else if(a.accuracy < b.accuracy){
        return -1;
      } else if (a.accuracy > b.accuracy) {
        return 1;
      } else return 0;      
    }) 
  }
  
  handleToggleAccuracySort = () => {
    if (this.state.sortedByAccuracy) {
      this.setState({
        sortedByLevel: false,
        sortedByName: false,
        sortedByPower: false,
        sortedByAccuracy: true,
        levelUpMoves: this.state.levelUpMoves.reverse(),
        tmMoves: this.state.tmMoves.reverse(),
        tutorMoves: this.state.tutorMoves.reverse(),
        eggMoves: this.state.eggMoves.reverse()
      })
    } else {
      let newLevelUpMoves = [...this.state.levelUpMoves];
      let newTmMoves = [...this.state.tmMoves];
      let newTutorMoves = [...this.state.tutorMoves];
      let newEggMoves = [...this.state.eggMoves];

      this.sortMovesByAccuracy(newLevelUpMoves);
      this.sortMovesByAccuracy(newTmMoves);
      this.sortMovesByAccuracy(newTutorMoves);
      this.sortMovesByAccuracy(newEggMoves);

      this.setState({
        sortedByLevel: false,
        sortedByName: false,
        sortedByPower: false,
        sortedByAccuracy: true,
        levelUpMoves: newLevelUpMoves,
        tmMoves: newTmMoves,
        tutorMoves: newTutorMoves,
        eggMoves: newEggMoves
      })
    }
  }

  // power sorting
  sortMovesByPower = (arr) => {
    arr.sort((a,b) => {
      if (a.power === null && b.power) {
        return -1
      } else if (a.power && b.power === null) {
        return 1
      } else if (!a.power && !b.power) {
        return 0
      } else if(a.power < b.power){
        return -1;
      } else if (a.power > b.power) {
        return 1;
      } else return 0;      
    }) 
  }

  handleTogglePowerSort = () => {
    if (this.state.sortedByPower) {
      this.setState({
        sortedByLevel: false,
        sortedByName: false,
        sortedByPower: true,
        levelUpMoves: this.state.levelUpMoves.reverse(),
        tmMoves: this.state.tmMoves.reverse(),
        tutorMoves: this.state.tutorMoves.reverse(),
        eggMoves: this.state.eggMoves.reverse()
      })
    } else {
      let newLevelUpMoves = [...this.state.levelUpMoves];
      let newTmMoves = [...this.state.tmMoves];
      let newTutorMoves = [...this.state.tutorMoves];
      let newEggMoves = [...this.state.eggMoves];

      this.sortMovesByPower(newLevelUpMoves);
      this.sortMovesByPower(newTmMoves);
      this.sortMovesByPower(newTutorMoves);
      this.sortMovesByPower(newEggMoves);

      this.setState({
        sortedByLevel: false,
        sortedByName: false,
        sortedByPower: true,
        levelUpMoves: newLevelUpMoves,
        tmMoves: newTmMoves,
        tutorMoves: newTutorMoves,
        eggMoves: newEggMoves
      })
    }
  }

  // level sorting
  sortMovesByLevel = (arr) => {
    arr.sort((a,b) => {
      if(a.levelLearned < b.levelLearned){
        return -1;
      } else if (a.levelLearned > b.levelLearned) {
        return 1;
      } else return 0;
    })
  }

  handleToggleLevelSort = () => {
    if (this.state.sortedByLevel) {
      this.setState({
        sortedByLevel: true,
        sortedByName: false,
        levelUpMoves: this.state.levelUpMoves.reverse(),
      })
    } else {
      let sortedMoves = [...this.state.levelUpMoves];
      this.sortMovesByLevel(sortedMoves);
      this.setState({
        sortedByLevel: true,
        sortedByName: false,
        levelUpMoves: sortedMoves
      })
    }
  }

  // name sorting
  sortMovesByName = (arr) => {
    arr.sort((a,b) => {
      if(a.name < b.name){
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else return 0;
    })
  }

  handleToggleNameSort = () => {

    if (this.state.sortedByName) {
      // if moves are already sorted by name, then reverse the order to switch from ascending/descending
      this.setState({
        sortedByName: true,
        sortedByLevel: false,
        levelUpMoves: this.state.levelUpMoves.reverse(),
        tmMoves: this.state.tmMoves.reverse(),
        tutorMoves: this.state.tutorMoves.reverse(),
        eggMoves: this.state.eggMoves.reverse()
      })
    } else {
      // if moves are NOT sorted by name, sort moves alphabetically
      let newLevelUpMoves = [...this.state.levelUpMoves];
      let newTmMoves = [...this.state.tmMoves];
      let newTutorMoves = [...this.state.tutorMoves];
      let newEggMoves = [...this.state.eggMoves];

      this.sortMovesByName(newLevelUpMoves);
      this.sortMovesByName(newTmMoves);
      this.sortMovesByName(newTutorMoves);
      this.sortMovesByName(newEggMoves);

      this.setState({
        sortedByLevel: false,
        sortedByName: true,
        levelUpMoves: newLevelUpMoves,
        tmMoves: newTmMoves,
        tutorMoves: newTutorMoves,
        eggMoves: newEggMoves
      })
    }
  }

  // parse moves by learn method
  parseEggMoves = () => {
    let eggArr = [];

    this.props.moves.forEach(move => {
      if (move.learnMethod === 'egg') {
        eggArr.push(move);
      }
    })

    this.sortMovesByName(eggArr);

    this.setState({eggMoves: eggArr})
  }

  parseLevelUpMoves = () => {
    let levelUpArr = [];

    this.props.moves.forEach(move => {
      if (move.learnMethod === 'level-up') {
        levelUpArr.push(move);
      }
    })

    this.sortMovesByLevel(levelUpArr);

    this.setState({levelUpMoves: levelUpArr})
  }

  parseTmMoves = () => {
    let tmArr = [];

    this.props.moves.forEach(move => {
      if (move.learnMethod === 'machine') {
        tmArr.push(move);
      }
    })

    this.sortMovesByName(tmArr);

    this.setState({tmMoves: tmArr})
  }

  parseTutorMoves = () => {
    let tutorArr = [];

    this.props.moves.forEach(move => {
      if (move.learnMethod === 'tutor') {
        tutorArr.push(move);
      }
    })

    this.sortMovesByName(tutorArr);

    this.setState({tutorMoves: tutorArr})
  }

  // this runs all four previous parse methods
  parseMoves = () => {
    this.parseEggMoves();
    this.parseLevelUpMoves();
    this.parseTmMoves();
    this.parseTutorMoves();
  }

  // responsible for displaying moves in the accordion component
  displayMoves = (thisstateProperty) => {
    if (thisstateProperty.length > 0) {
      return thisstateProperty
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

  // handles state change & move parsing during react lifecycle
  componentDidMount() {
    this.parseMoves();
    setTimeout(() => this.setState({
      levelUpMoves: this.state.levelUpMoves,
      tmMoves: this.state.tmMoves,
      tutorMoves: this.state.tutorMoves,
      eggMoves: this.state.eggMoves,
      sortedByLevel: true
    }), 10)
  }

  render(){
    return(
      <Accordion defaultActiveKey='0'>
        
        {/* level up moves */}
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Level-Up</Accordion.Header>
          <Accordion.Body>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th><Button onClick={this.handleToggleLevelSort}>Level</Button></th>
                  <th><Button onClick={this.handleToggleNameSort}>Name</Button></th>
                  <th><Button onClick={this.handleTogglePowerSort}>Power</Button></th>
                  <th><Button onClick={this.handleToggleAccuracySort}>Accuracy</Button></th>
                  <th>PP</th>
                  <th>Class</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.displayMoves(this.state.levelUpMoves)}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        {/* tm moves */}
        <Accordion.Item eventKey='1'>
          <Accordion.Header>TM Moves</Accordion.Header>
          <Accordion.Body>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th><Button onClick={this.handleToggleLevelSort} >Level</Button></th>
                  <th><Button onClick={this.handleToggleNameSort}>Name</Button></th>
                  <th>Power</th>
                  <th>Accuracy</th>
                  <th>PP</th>
                  <th>Class</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                 {this.displayMoves(this.state.tmMoves)}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        {/* tutor moves */}
        <Accordion.Item eventKey='2'>
          <Accordion.Header>Tutor Moves</Accordion.Header>
          <Accordion.Body>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th><Button onClick={this.handleToggleLevelSort} >Level</Button></th>
                  <th><Button onClick={this.handleToggleNameSort}>Name</Button></th>
                  <th>Power</th>
                  <th>Accuracy</th>
                  <th>PP</th>
                  <th>Class</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
              {this.displayMoves(this.state.tutorMoves)}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        {/* egg moves */}
        <Accordion.Item eventKey='3'>
          <Accordion.Header>Egg Moves</Accordion.Header>
          <Accordion.Body>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th><Button onClick={this.handleToggleLevelSort} >Level</Button></th>
                  <th><Button onClick={this.handleToggleNameSort}>Name</Button></th>
                  <th>Power</th>
                  <th>Accuracy</th>
                  <th>PP</th>
                  <th>Class</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
              {this.displayMoves(this.state.eggMoves)}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    )
  }
}

export default MoveList;

  // filterDuplicateMoves = (arr) => {
  //   let filteredArr = [];

  //   for (let i = 0; i < arr.length; i++) {
  //     if (!arr[i + 1]){
        
  //     }
  //     else if (arr[i].name !== arr[i + 1].name) {
  //       filteredArr = [arr[i], ...filteredArr];
  //     }
  //   }
  //   return filteredArr;
  // }