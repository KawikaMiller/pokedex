import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
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

  const pokeState = useSelector(state => state.pokemon);

  // parse moves by learn method
  const parseLevelUpMoves = () => {
    pokeState.pokemon.moves.forEach(move => {
      if (move.learnMethod === 'level-up' && !levelUpMoves.includes(move)) {
        setLevelUpMoves(levelUpMoves.push(move))
      }
    })

  }

  const parseTmMoves = () => {
    pokeState.pokemon.moves.forEach(move => {
      if (move.learnMethod === 'machine' && !tmMoves.includes(move)) {
        setTmMoves(tmMoves.push(move))
      }
    })

  }

  const parseTutorMoves = () => {
    pokeState.pokemon.moves.forEach(move => {
      if (move.learnMethod === 'tutor' && !tutorMoves.includes(move)) {
        setTutorMoves(tutorMoves.push(move))
      }
    })

  }

  const parseEggMoves = () => {
    pokeState.pokemon.moves.forEach(move => {
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

  const handleKeyChange = (key) => {
    if(key !== null){
      setActiveKey(key)
    }
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
  }, []) //eslint-disable-line

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
    </Card>

    // <Accordion id='learnset' defaultActiveKey={'0'} activeKey={activeKey} onSelect={e => handleKeyChange(e)}>
      
    //   {/* level up moves */}
    //   <Accordion.Item eventKey='0'>
    //     <Accordion.Header className='label'>Level-Up Moves</Accordion.Header>
    //     <Accordion.Body className='accordion_body_movelist'>
    //       <MoveList moves={levelUpMoves} />
    //     </Accordion.Body>
    //   </Accordion.Item>

    //   {/* tm moves */}
    //   <Accordion.Item eventKey='1'>
    //     <Accordion.Header className='label'>TM Moves</Accordion.Header>
    //     <Accordion.Body className='accordion_body_movelist'>
    //       <MoveList moves={tmMoves} header="TM Moves" disableLevelLearned={true} />
    //     </Accordion.Body>
    //   </Accordion.Item>

    //   {/* tutor moves */}
    //   {tutorMoves.length > 0 ? 
    //     <Accordion.Item eventKey='2'>
    //       <Accordion.Header className='label'>Tutor Moves</Accordion.Header>
    //       <Accordion.Body className='accordion_body_movelist'>
    //         <MoveList moves={tutorMoves} header="Tutor Moves" disableLevelLearned={true} />
    //       </Accordion.Body>
    //     </Accordion.Item>
    //   : 
    //    null
    //   }

      
    //   {/* egg moves */}
    //   {eggMoves.length > 0 ?
    //     <Accordion.Item eventKey='3'>
    //       <Accordion.Header className='label'>Egg Moves</Accordion.Header>
    //       <Accordion.Body className='accordion_body_movelist'>
    //         <MoveList moves={eggMoves} header="Egg Moves" disableLevelLearned={true} />
    //       </Accordion.Body>
    //     </Accordion.Item>
    //   :
    //     null      
    //   }


    // </Accordion>
  )
}

export default Learnset;