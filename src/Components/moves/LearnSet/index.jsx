import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import MoveList from '../MoveList';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav'
import '../../../css/learnset.css';

import { useSelector } from 'react-redux';

function Learnset (props) {
  const [levelUpMoves, setLevelUpMoves] = useState([]);
  const [tmMoves, setTmMoves] = useState([]);
  const [tutorMoves, setTutorMoves] = useState([]);
  const [eggMoves, setEggMoves] = useState([]);
  const [activeKey, setActiveKey] = useState(0);
  const [activeGeneration, setActiveGeneration] = useState('yellow');

  const pokeState = useSelector(state => state.pokemon);

  // this runs all four previous parse methods
  const parseMovesByGeneration = (version) => {
    let levelArr = [];
    let tmArr = [];
    let tutorArr = [];
    let eggArr = [];

    pokeState.pokemon?.moves.forEach(move => {
      move.versionDetails.forEach(details => {
        if (details.version === version) {
          let nMove = {...move};
          nMove.learnMethod = details.learnMethod;
          nMove.levelLearned = details.levelLearned;
          switch(details.learnMethod){
            case 'level-up':
              levelArr.push(nMove);
              break;
            case 'machine':
              tmArr.push(nMove);
              break;
            case 'tutor':
              tutorArr.push(nMove);
              break;
            case 'egg':
              eggArr.push(nMove);
              break;
            default:
              console.log('error parsing moves by learn method');
          }
        }
      })
    })

    setLevelUpMoves(levelArr);
    setTmMoves(tmArr);
    setTutorMoves(tutorArr);
    setEggMoves(eggArr);
  }

  // handles state change & move parsing during react lifecycle || simulates 'componentDidMount'
  useEffect(() => {
    parseMovesByGeneration(activeGeneration)

  }, []) //eslint-disable-line

  useEffect(() => {
    parseMovesByGeneration(activeGeneration)
  }, [pokeState.pokemon, activeGeneration]) //eslint-disable-line

  return(

    <Card className='details'>
      <Card.Header className='main_right_card_header'>
        <Nav variant='tabs' defaultActiveKey={activeKey}>
          <Nav.Item className='subCard'>
            <Nav.Link onClick={() => setActiveKey(0)}>Level</Nav.Link>
          </Nav.Item>
          <Nav.Item className='subCard'>
            <Nav.Link onClick={() => setActiveKey(1)}>TM</Nav.Link>
          </Nav.Item>
          {
            tutorMoves.length > 0 ? 
            <Nav.Item className='subCard'>
              <Nav.Link onClick={() => setActiveKey(2)}>Tutor</Nav.Link>
            </Nav.Item>
            :
            null
          }
          {
            eggMoves.length > 0 ? 
            <Nav.Item className='subCard'>
              <Nav.Link onClick={() => setActiveKey(3)}>Egg</Nav.Link>
            </Nav.Item>
            :
            null
          }          

        </Nav>
      </Card.Header>
      <Card.Body className='movelist_body'>
        {
          activeKey === 0 ? 
          <MoveList moves={levelUpMoves} />
          :
          activeKey === 1 ?
          <MoveList moves={tmMoves} header="TM Moves" disableLevelLearned={true} />
          :
          activeKey === 2 ?
          <MoveList moves={tutorMoves} header="Tutor Moves" disableLevelLearned={true} />
          :
          activeKey === 3 ?
          <MoveList moves={eggMoves} header="Egg Moves" disableLevelLearned={true} />
          :
          null
        }
      </Card.Body>
      <Card.Footer style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Button size='sm' onClick={() => setActiveGeneration('yellow')}>Gen 1</Button>
        <Button size='sm' onClick={() => setActiveGeneration('crystal')}>Gen 2</Button>
        <Button size='sm' onClick={() => setActiveGeneration('emerald')}>Gen 3</Button>
        <Button size='sm' onClick={() => setActiveGeneration('platinum')}>Gen 4</Button>
        <Button size='sm' onClick={() => setActiveGeneration('black-2-white-2')}>Gen 5</Button>
        <Button size='sm' onClick={() => setActiveGeneration('x-y')}>Gen 6</Button>
        <Button size='sm' onClick={() => setActiveGeneration('ultra-sun-ultra-moon')}>Gen 7</Button>
        <Button size='sm' onClick={() => setActiveGeneration('sword-shield')}>Gen 8</Button>
        <Button size='sm' onClick={() => setActiveGeneration('scarlet-violet')}>Gen 9</Button>
      </Card.Footer>
    </Card>

  )
}

export default Learnset;