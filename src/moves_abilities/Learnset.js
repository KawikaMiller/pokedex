import React, { useState, useEffect } from 'react';
// import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
// import Button from 'react-bootstrap/Button';
import MoveList from './MoveList';

function Learnset (props) {
  const [levelUpMoves, setLevelUpMoves] = useState([]);
  const [tmMoves, setTmMoves] = useState([]);
  const [tutorMoves, setTutorMoves] = useState([]);
  const [eggMoves, setEggMoves] = useState([]);


  // parse moves by learn method
  const parseLevelUpMoves = () => {

    props.moves.forEach(move => {
      if (move.learnMethod === 'level-up' && !levelUpMoves.includes(move)) {
        setLevelUpMoves(levelUpMoves.push(move))
      }
    })

  }

  const parseTmMoves = () => {

    props.moves.forEach(move => {
      if (move.learnMethod === 'machine' && !tmMoves.includes(move)) {
        setTmMoves(tmMoves.push(move))
      }
    })

  }

  const parseTutorMoves = () => {

    props.moves.forEach(move => {
      if (move.learnMethod === 'tutor' && !tutorMoves.includes(move)) {
        setTutorMoves(tutorMoves.push(move))
      }
    })

  }

  const parseEggMoves = () => {

    props.moves.forEach(move => {
      if (move.learnMethod === 'egg' && !eggMoves.includes(move)) {
        setEggMoves(eggMoves.push(move))
      }
    })

  }

  // this runs all four previous parse methods
  const parseMoves = () => {
    parseEggMoves();
    parseLevelUpMoves();
    parseTmMoves();
    parseTutorMoves();
  }

  // handles state change & move parsing during react lifecycle || simulates 'componentDidMount'
  useEffect(() => {
    parseMoves();
    setTimeout(() => {
      setLevelUpMoves(levelUpMoves);
      setTmMoves(tmMoves);
      setTutorMoves(tutorMoves);
      setEggMoves(eggMoves);
    }, 10)
  }, [])

  return(
    <Accordion defaultActiveKey='0'>
      
      {/* level up moves */}
      <Accordion.Item eventKey='0'>
        <MoveList moves={levelUpMoves} header="Level-Up Moves" pokemonName={props.pokemonName} />
      </Accordion.Item>

      {/* tm moves */}
      <Accordion.Item eventKey='1'>
        <MoveList moves={tmMoves} header="TM Moves" pokemonName={props.pokemonName} />
      </Accordion.Item>

      {/* tutor moves */}
      <Accordion.Item eventKey='2'>
        <MoveList moves={tutorMoves} header="Tutor Moves" pokemonName={props.pokemonName} />
      </Accordion.Item>
      
      {/* egg moves */}
      <Accordion.Item eventKey='3'>
        <MoveList moves={eggMoves} header="Egg Moves" pokemonName={props.pokemonName} />
      </Accordion.Item>

    </Accordion>
  )
}

export default Learnset;