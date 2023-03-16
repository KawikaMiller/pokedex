import React from 'react';
// import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
// import Button from 'react-bootstrap/Button';
import MoveList from './MoveList';

class Learnset extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      levelUpMoves: [],
      tmMoves: [],
      tutorMoves: [],
      eggMoves: [],
    }
  }

  // parse moves by learn method
  parseLevelUpMoves = () => {
    let levelUpArr = [];

    this.props.moves.forEach(move => {
      if (move.learnMethod === 'level-up') {
        levelUpArr.push(move);
      }
    })

    // this.sortMovesByLevel(levelUpArr);

    this.setState({levelUpMoves: levelUpArr})
  }

  parseTmMoves = () => {
    let tmArr = [];

    this.props.moves.forEach(move => {
      if (move.learnMethod === 'machine') {
        tmArr.push(move);
      }
    })

    // this.sortMovesByName(tmArr);

    this.setState({tmMoves: tmArr})
  }

  parseTutorMoves = () => {
    let tutorArr = [];

    this.props.moves.forEach(move => {
      if (move.learnMethod === 'tutor') {
        tutorArr.push(move);
      }
    })

    // this.sortMovesByName(tutorArr);

    this.setState({tutorMoves: tutorArr})
  }

  parseEggMoves = () => {
    let eggArr = [];

    this.props.moves.forEach(move => {
      if (move.learnMethod === 'egg') {
        eggArr.push(move);
      }
    })

    // this.sortMovesByName(eggArr);

    this.setState({eggMoves: eggArr})
  }

  // this runs all four previous parse methods
  parseMoves = () => {
    this.parseEggMoves();
    this.parseLevelUpMoves();
    this.parseTmMoves();
    this.parseTutorMoves();
  }

  // handles state change & move parsing during react lifecycle
  componentDidMount() {
    this.parseMoves();
    setTimeout(() => this.setState({
      levelUpMoves: this.state.levelUpMoves,
      tmMoves: this.state.tmMoves,
      tutorMoves: this.state.tutorMoves,
      eggMoves: this.state.eggMoves,
    }), 10)
  }

  render(){
    return(
      <Accordion defaultActiveKey='0'>
        
        {/* level up moves */}
        <Accordion.Item eventKey='0'>
          <MoveList moves={this.state.levelUpMoves} header="Level-Up Moves" />
        </Accordion.Item>

        {/* tm moves */}
        <Accordion.Item eventKey='1'>
          <MoveList moves={this.state.tmMoves} header="TM Moves" />
        </Accordion.Item>

        {/* tutor moves */}
        <Accordion.Item eventKey='2'>
          <MoveList moves={this.state.tutorMoves} header="Tutor Moves" />
        </Accordion.Item>
        
        {/* egg moves */}
        <Accordion.Item eventKey='3'>
          <MoveList moves={this.state.eggMoves} header="Egg Moves" />
        </Accordion.Item>

      </Accordion>
    )
  }
}

export default Learnset;

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