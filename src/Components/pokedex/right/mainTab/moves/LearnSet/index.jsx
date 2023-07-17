import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import MoveList from '../MoveList';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav'
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

import { useSelector } from 'react-redux';

function Learnset (props) {
  const [levelUpMoves, setLevelUpMoves] = useState([]);
  const [tmMoves, setTmMoves] = useState([]);
  const [tutorMoves, setTutorMoves] = useState([]);
  const [eggMoves, setEggMoves] = useState([]);
  const [generationMoves, setGenerationMoves] = useState({});

  const [activeKey, setActiveKey] = useState(0);
  const [activeGeneration, setActiveGeneration] = useState('yellow');

  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex);
  const settingsState = useSelector(state => state.settings);

  let hasMoves = {
      'red-blue': false,
      yellow: false,
      'gold-silver': false,
      crystal: false,
      'ruby-sapphire': false,
      emerald: false,
      'firered-leafgreen': false,
      colosseum: false,
      xd: false,
      'diamond-pearl': false,
      platinum: false,
      'heartgold-soulsilver': false,
      'black-white': false,
      'black-2-white-2': false,
      'x-y': false,
      'omega-ruby-alpha-sapphire': false,
      'sun-moon': false,
      'ultra-sun-ultra-moon': false,
      'lets-go-pikachu-lets-go-eevee': false,
      'sword-shield': false,
      'brilliant-diamond-and-shining-pearl': false,
      'legends-arceus': false,
      'scarlet-violet': false,
  }

  // this runs all four previous parse methods
  const parseMovesByGeneration = (version) => {
    let levelArr = [];
    let tmArr = [];
    let tutorArr = [];
    let eggArr = [];

    pokeState.pokemon?.moves.forEach(move => {
      move.versionDetails.forEach(details => {
        
        if(!hasMoves[details.version]){
          hasMoves[details.version] = true;
        };


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
  // useEffect(() => {
  //   console.log('use effect on mount')
  //   parseMovesByGeneration(activeGeneration, false)
  // }, []) //eslint-disable-line

  useEffect(() => {
    parseMovesByGeneration(activeGeneration);
    setGenerationMoves(hasMoves)
  }, [pokeState.pokemon, activeGeneration]) //eslint-disable-line

  return(
  
    <Card id='learnset' className={`details ${settingsState.theme}`}>
      <Card.Header className={settingsState.theme} style={{justifyContent: 'space-between', color: 'white', fontWeight: '700'}}>
        {activeGeneration}
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
        <SplitButton
          className={`${settingsState.theme} move_gen_button`} 
          title='I'
          size='sm'
          align={{sm: 'start'}}
          disabled={pokeState.pokemon?.id > 151 || (!generationMoves['yellow'] && !generationMoves['red-blue'])}
          onClick={(event) => handleClick(event, 'yellow')}
        >
          <Dropdown.Item onClick={(event) => handleClick(event, 'red-blue')} disabled={!generationMoves['red-blue']}>Red | Blue</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'yellow')} disabled={!generationMoves['yellow']}>Yellow</Dropdown.Item>
        </SplitButton>

        <SplitButton
          className={`${settingsState.theme} move_gen_button`} 
          title='II'
          size='sm'
          align={{sm: 'start'}}
          disabled={pokeState.pokemon?.id > 251 || (!generationMoves['gold-silver'] && !generationMoves['crystal'])}
          onClick={(event) => handleClick(event, 'crystal')}
        >
          <Dropdown.Item onClick={(event) => handleClick(event, 'gold-silver')} disabled={!generationMoves['gold-silver']}>Gold | Silver</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'crystal')} disabled={!generationMoves['crystal']}>Crystal</Dropdown.Item>
        </SplitButton>

        <SplitButton
          className={`${settingsState.theme} move_gen_button`} 
          title='III'
          size='sm'
          align={{sm: 'start'}}
          disabled={pokeState.pokemon?.id > 386 || (!generationMoves['ruby-sapphire'] && !generationMoves['emerald'] && !generationMoves['firered-leafgreen'] && !generationMoves['colosseum'] && !generationMoves['xd'])}
          onClick={(event) => handleClick(event, 'emerald')}
        >
          <Dropdown.Item onClick={(event) => handleClick(event, 'ruby-sapphire')} disabled={!generationMoves['ruby-sapphire']}>Ruby | Sapphire</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'emerald')} disabled={!generationMoves['emerald']}>Emerald</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'firered-leafgreen')} disabled={!generationMoves['firered-leafgreen']}>Fire Red | Leaf Green</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'colosseum')} disabled={!generationMoves['colosseum']}>Colosseum</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'xd')} disabled={!generationMoves['xd']}>XD</Dropdown.Item>
        </SplitButton>

        <SplitButton
          className={`${settingsState.theme} move_gen_button`} 
          title='IIII'
          size='sm'
          align={{sm: 'start'}}
          disabled={pokeState.pokemon?.id > 494 || (!generationMoves['diamond-pearl'] && !generationMoves['platinum'] && !generationMoves['heartgold-soulsilver'])}
          onClick={(event) => handleClick(event, 'platinum')}
        >
          <Dropdown.Item onClick={(event) => handleClick(event, 'diamond-pearl')} disabled={!generationMoves['diamond-pearl']}>Diamond | Pearl</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'platinum')} disabled={!generationMoves['platinum']}>Platinum</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'heartgold-soulsilver')} disabled={!generationMoves['heartgold-soulsilver']}>Heart Gold | Soul Silver</Dropdown.Item>
        </SplitButton>

        <SplitButton
          className={`${settingsState.theme} move_gen_button`} 
          title='V'
          size='sm'
          align={{sm: 'start'}}
          disabled={pokeState.pokemon?.id > 649 || (!generationMoves['black-white'] && !generationMoves['black-2-white-2'])}
          onClick={(event) => handleClick(event, 'black-2-white-2')}
        >
          <Dropdown.Item onClick={(event) => handleClick(event, 'black-white')} disabled={!generationMoves['black-white']}>Black | White</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'black-2-white-2')} disabled={!generationMoves['black-2-white-2']}>Black 2 | White 2</Dropdown.Item>
        </SplitButton>

        <SplitButton
          className={`${settingsState.theme} move_gen_button`} 
          title='VI'
          size='sm'
          align={{sm: 'start'}}
          disabled={pokeState.pokemon?.id > 721 || (!generationMoves['x-y'] && !generationMoves['omega-ruby-alpha-sapphire'])}
          onClick={(event) => handleClick(event, 'x-y')}
        >
          <Dropdown.Item onClick={(event) => handleClick(event, 'x-y')} disabled={!generationMoves['x-y']}>X | Y</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'omega-ruby-alpha-sapphire')} disabled={!generationMoves['omega-ruby-alpha-sapphire']}>Omega Ruby | Alpha Sapphire</Dropdown.Item>
        </SplitButton>

        <SplitButton
          className={`${settingsState.theme} move_gen_button`} 
          title='VII'
          size='sm'
          align={{sm: 'start'}}
          disabled={pokeState.pokemon?.id > 809 || (!generationMoves['sun-moon'] && !generationMoves['ultra-sun-ultra-moon'] && !generationMoves['lets-go-pikachu-lets-go-eevee'])}
          onClick={(event) => handleClick(event, 'ultra-sun-ultra-moon')}
        >
          <Dropdown.Item onClick={(event) => handleClick(event, 'sun-moon')} disabled={!generationMoves['sun-moon']}>Sun | Moon</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'ultra-sun-ultra-moon')} disabled={!generationMoves['ultra-sun-ultra-moon']}>Ultra Sun/Moon</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'lets-go-pikachu-lets-go-eevee')} disabled={!generationMoves['lets-go-pikachu-lets-go-eevee']}>Let's Go Pikachu/Eevee</Dropdown.Item>
        </SplitButton>

        <SplitButton
          className={`${settingsState.theme} move_gen_button`} 
          title='VIII'
          size='sm'
          align={{sm: 'start'}}
          disabled={pokeState.pokemon?.id > 905 || (!generationMoves['sword-shield'] && !generationMoves['diamond-pearl'] && !generationMoves['legends-arceus'])}
          onClick={(event) => handleClick(event, 'sword-shield')}
        >
          <Dropdown.Item onClick={(event) => handleClick(event, 'sword-shield')} disabled={!generationMoves['sword-shield']}>Sword | Shield</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'diamond-pearl')} disabled={!generationMoves['diamond-pearl']}>Brilliant Diamond | Shining Pearl</Dropdown.Item>
          <Dropdown.Item onClick={(event) => handleClick(event, 'legends-arceus')} disabled={!generationMoves['legends-arceus']}>Legends Arceus</Dropdown.Item>
        </SplitButton>

        <SplitButton
          className={`${settingsState.theme} move_gen_button`} 
          title='IX'
          size='sm'
          align={{sm: 'start'}}
          disabled={pokeState.pokemon?.id > 905 || !generationMoves['scarlet-violet']}
          onClick={(event) => handleClick(event, 'scarlet-violet')}
        >
          <Dropdown.Item onClick={(event) => handleClick(event, 'scarlet-violet')} >Scarlet | Violet</Dropdown.Item>
        </SplitButton>

      </Card.Footer>
    </Card>

  )
}

export default Learnset;