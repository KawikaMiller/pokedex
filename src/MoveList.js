import React from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

class MoveList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      // levelUpMoves: {
      //   all: [],
      //   red_blue: [],
      //   yellow: [],
      //   gold_silver: [],
      //   crystal: [],
      //   ruby_sapphire: [],
      //   fireRed_leafGreen: [],
      //   emerald: [],
      //   diamond_pearl: [],
      //   platinum: [],
      //   heartGold_soulSilver: [],
      //   black_white: [],
      //   black_white_2: [],
      //   x_y: [],
      //   omegaRuby_alphaSapphire: [],
      //   sun_moon: [],
      //   ultra_sun_moon: [],
      //   lets_go: [],
      //   sword_shield: [],
      //   scarlet_violet: [],
      // },
      levelUpMoves: [],
      tmMoves: [],
      tutorMoves: [],
      eggMoves: [],
      sortedByLevel: true,
      sortedByName: false,
    }
  }

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
      this.setState({
        sortedByName: true,
        sortedByLevel: false,
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

  displayMoves = (thisstateProperty) => {
    if (thisstateProperty.length > 0) {
      return thisstateProperty
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

  componentDidMount() {
    this.setState({sortedByLevel: true})
    this.parseLevelUpMoves();
    this.parseTmMoves();
    this.parseTutorMoves();
    this.parseEggMoves();
  }

  render(){
    return(
      <Accordion defaultActiveKey='0'>

        <Accordion.Item eventKey='0'>
          <Accordion.Header>Level-Up</Accordion.Header>
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
                {this.displayMoves(this.state.levelUpMoves)}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>

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