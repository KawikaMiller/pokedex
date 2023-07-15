import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import MoveList from '../MoveList';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav'
import Spinner from 'react-bootstrap/Spinner';

import { useSelector } from 'react-redux';

function Learnset (props) {
  const [levelUpMoves, setLevelUpMoves] = useState([]);
  const [tmMoves, setTmMoves] = useState([]);
  const [tutorMoves, setTutorMoves] = useState([]);
  const [eggMoves, setEggMoves] = useState([]);
  const [activeKey, setActiveKey] = useState(0);
  const [activeGeneration, setActiveGeneration] = useState('yellow');

  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex);
  const settingsState = useSelector(state => state.settings);

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

  const handleClick = (event, generation) => {
    console.log(event.target.classList)

    setActiveGeneration(generation);
    let buttonEls = document.getElementsByClassName('move_gen_button');
    for(const button of buttonEls){
      if (button.classList.contains('active_button')){
        button.classList.remove('active_button');
      }
    }
    event.target.classList.add('active_button')
  }

  // handles state change & move parsing during react lifecycle || simulates 'componentDidMount'
  useEffect(() => {
    parseMovesByGeneration(activeGeneration)

  }, []) //eslint-disable-line

  useEffect(() => {
    parseMovesByGeneration(activeGeneration)
  }, [pokeState.pokemon, activeGeneration]) //eslint-disable-line

  return(

    <Card id='learnset' className={`details ${settingsState.theme}`}>
      <Card.Header className={settingsState.theme}>
        <Nav variant='tabs' defaultActiveKey={activeKey}>
          <Nav.Item className='subCard'>
            <Nav.Link className={settingsState.theme} eventKey={0} onClick={() => setActiveKey(0)}>Level</Nav.Link>
          </Nav.Item>
          <Nav.Item className='subCard'>
            <Nav.Link className={settingsState.theme} eventKey={1} onClick={() => setActiveKey(1)}>TM</Nav.Link>
          </Nav.Item>
          {
            tutorMoves.length > 0 ? 
            <Nav.Item className='subCard'>
              <Nav.Link className={settingsState.theme} eventKey={2} onClick={() => setActiveKey(2)}>Tutor</Nav.Link>
            </Nav.Item>
            :
            null
          }
          {
            eggMoves.length > 0 ? 
            <Nav.Item className='subCard'>
              <Nav.Link className={settingsState.theme} eventKey={3} onClick={() => setActiveKey(3)}>Egg</Nav.Link>
            </Nav.Item>
            :
            null
          }          

        </Nav>
      </Card.Header>
      <Card.Body className='movelist_body'>
        {
          dexState.isLoading ?
          <div id='learnset_spinners'>
            <Spinner animation="grow" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <Spinner animation="grow" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <Spinner animation="grow" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>          
          </div>
          :
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
      <Card.Footer>
        <Button 
          className={`${settingsState.theme} move_gen_button`} 
          size='sm' 
          onClick={(event) => handleClick(event, 'yellow')} 
          disabled={pokeState.pokemon?.id > 151}
        >Gen 1</Button>

        <Button 
          className={`${settingsState.theme} move_gen_button`}  
          size='sm' 
          onClick={(event) => handleClick(event, 'crystal')}
          disabled={pokeState.pokemon?.id > 251}
        >Gen 2</Button>

        <Button 
          className={`${settingsState.theme} move_gen_button`}
          size='sm' 
          onClick={(event) => handleClick(event, 'emerald')}
          disabled={pokeState.pokemon?.id > 386}
        >Gen 3</Button>

        <Button 
          className={`${settingsState.theme} move_gen_button`}
          size='sm' 
          onClick={(event) => handleClick(event, 'platinum')}
          disabled={pokeState.pokemon?.id > 494}
        >Gen 4</Button>

        <Button 
          className={`${settingsState.theme} move_gen_button`}
          size='sm' 
          onClick={(event) => handleClick(event, 'black-2-white-2')}
          disabled={pokeState.pokemon?.id > 649}
        >Gen 5</Button>

        <Button 
          className={`${settingsState.theme} move_gen_button`}
          size='sm' 
          onClick={(event) => handleClick(event, 'x-y')}
          disabled={pokeState.pokemon?.id > 721}
        >Gen 6</Button>

        <Button 
          className={`${settingsState.theme} move_gen_button`}
          size='sm' 
          onClick={(event) => handleClick(event, 'ultra-sun-ultra-moon')}
          disabled={pokeState.pokemon?.id > 809}
        >Gen 7</Button>

        <Button 
          className={`${settingsState.theme} move_gen_button`}
          size='sm' 
          onClick={(event) => handleClick(event, 'sword-shield')}
          disabled={pokeState.pokemon?.id > 905}
        >Gen 8</Button>

        <Button 
          className={`${settingsState.theme} move_gen_button`}
          size='sm' 
          onClick={(event) => handleClick(event, 'scarlet-violet')}
        >Gen 9</Button>
      </Card.Footer>
    </Card>

  )
}

export default Learnset;