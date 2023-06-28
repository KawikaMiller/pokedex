import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import '../../../css/rightCard.css'
import Learnset from '../../moves/LearnSet';
import TypeBadge from '../../type/Badge';

function PokedexMainRight (props) {

  const pokeState = useSelector(state => state.pokemon);

  const [dexEntry, changeDexEntry] = useState(0);
  const [activeKey, setActiveKey] = useState(0);
  const [abilityKey, setAbilityKey] = useState(0);

  const handleChangeDexEntry = (value) => {
    // reset back to 0 when at end of descriptions
    if (dexEntry + value >= pokeState.pokemon.descriptions.length) {
      changeDexEntry(0);
    }
    // cycle back to end of descriptions if trying to go 'previous' from 0
    else if (dexEntry + value < 0) {
      changeDexEntry(pokeState.pokemon.descriptions.length - 1)
    }
    else {
      changeDexEntry(dexEntry + value)
    }
  }

  const handleChangeAbility = (value) => {
    // reset back to 0 when at end of descriptions
    if (abilityKey + value >= pokeState.pokemon.abilities.length) {
      setAbilityKey(0);
    }
    // cycle back to end of descriptions if trying to go 'previous' from 0
    else if (abilityKey + value < 0) {
      setAbilityKey(pokeState.pokemon.abilities.length - 1)
    }
    else {
      setAbilityKey(abilityKey + value)
    }
  }

  return(
    <Container className='rightMain'>

      <Container>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h2>{pokeState.pokemon?.name ? pokeState.pokemon.name[0].toUpperCase() + pokeState.pokemon.name.slice(1) : '--' }</h2>
            <h6>{pokeState.pokemon?.genus ? pokeState.pokemon.genus : '--'}</h6>
          </div>
          <div>
            <h4 style={{textAlign: 'end'}}>
              {pokeState.pokemon?.id ? `# ${pokeState.pokemon?.id.toString().padStart(4, '0')}` : '# 0000'}
            </h4>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              {pokeState.pokemon?.types ? pokeState.pokemon?.types.map(element => <TypeBadge type={element.type.name} />) : <TypeBadge type='--' />}           
            </div>
          </div>
        </div>
      </Container>

      <Container style={{height: '20vh', display: 'flex', flexDirection: 'column'}}>

        <Card className='details' style={{height: '100%'}}>

          <Card.Header className='main_right_card_header'>
            <Nav variant='tabs' defaultActiveKey={activeKey}>
              <Nav.Item className='subCard'>
                <Nav.Link eventKey={0}onClick={() => setActiveKey(0)}>
                  Dex
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='subCard'>
                <Nav.Link eventKey={1} onClick={() => setActiveKey(1)}>
                  Bio
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='subCard'>
                <Nav.Link eventKey={2} onClick={() => setActiveKey(2)}>
                  Ability
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem'}}>

            {activeKey === 0 ?
            
            <>
              <Button disabled={pokeState.pokemon?.name ? false : true} onClick={() => handleChangeDexEntry(-1)}>{`<`}</Button>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                  {
                    pokeState.pokemon?.name ? 
                      <h6>Version: {pokeState.pokemon?.descriptions[dexEntry].version}</h6>
                    :
                      <p>--</p>
                  }
                {pokeState.pokemon?.descriptions[dexEntry].description}
              </div>
              <Button disabled={pokeState.pokemon?.name ? false : true} onClick={() => handleChangeDexEntry(1)}>{`>`}</Button>            
            </>

            :

            activeKey === 1 ?

            <>
            <div className='centered spreadCol'>
              <div>
                <p className='underline'>Height & Weight</p>
                <p>
                  {pokeState.pokemon?.name ?
                    `${pokeState.pokemon?.height.m} m | ${pokeState.pokemon?.weight.kg} kg`
                    :
                    '--'
                  }
                </p>              
              </div>
              <div>
                <p className='underline'>Gender Ratio</p>
                <p> 
                  {pokeState.pokemon?.name ?
                    `${100 - (pokeState.pokemon?.genderRate / 8 * 100)} ♂ | ${pokeState.pokemon?.genderRate / 8 * 100}% ♀`
                    :
                    '--'
                  }
                </p>              
              </div>              
            </div>
            
            <div className='centered spreadCol'>
              <div>
                <p className='underline'>Catch Rate</p>
                <p>
                  {pokeState.pokemon?.eggGroups[1] ?
                    `${pokeState.pokemon?.catchRate}`
                  :
                    '--'
                  }
                  
                </p>              
              </div>
              <div>
              <p className='underline'>Growth Rate</p>
                <p>
                  {pokeState.pokemon?.eggGroups[1] ?
                    `${pokeState.pokemon?.growthRate.name}`
                  :
                    '--'
                  }
                </p>             
              </div>
            </div>

            <div className='centered spreadCol'>
              <div>
                <p className='underline'>Egg Groups</p>
                <span>
                  {
                    pokeState.pokemon?.eggGroups ?
                      pokeState.pokemon.eggGroups[1] ?
                        `${pokeState.pokemon.eggGroups[0]} | ${pokeState.pokemon.eggGroups[1]}`
                      :
                        `${pokeState.pokemon.eggGroups[0]}`
                    :
                      '--'
                  }
                </span>             
              </div>
              <div>
                <p className='underline'>Hatch Time</p>
                <p>
                  {pokeState.pokemon?.name ?
                    `${pokeState.pokemon?.hatchTime} Cycles`
                    :
                    '--'
                  }                 

                </p>     
              </div>              
            </div>

            <div className='centered spreadCol'>
              <div>
                <p className='underline'>XP Yield</p>
                <p>
                  {pokeState.pokemon?.name ?
                    `${pokeState.pokemon?.baseExpYield} EXP`
                    :
                    '--'
                  } 
                </p>              
              </div>
              <div>
                <p className='underline'>Ev Yield</p>
                <span>
                  {pokeState.pokemon?.name ?
                    pokeState.pokemon?.evYields.map(stat => {
                      if(stat.yield){
                        return `${stat.name} ${stat.yield} `;
                      } else{
                        return '';
                      }
                    })
                    :
                    '--'
                  }
                </span>
              </div>              
            </div>

            </>

            :

            activeKey === 2 ?

            <>
              <Button disabled={pokeState.pokemon?.name ? false : true} onClick={() => handleChangeAbility(-1)}>{`<`}</Button>
              <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', textAlign: 'center'}}>
                {
                  pokeState.pokemon?.name ?
                  <>
                    <h6>{pokeState.pokemon?.abilities[abilityKey].name}</h6>
                    <p>{pokeState.pokemon?.abilities[abilityKey].description}</p>                 
                  </> 
                  :
                  '--'
                }
              </div>
              <Button disabled={pokeState.pokemon?.name ? false : true} onClick={() => handleChangeAbility(1)}>{`>`}</Button>            
            </>
            
            :

            null
              
            }

          </Card.Body>
        </Card>
      </Container>

      <Container>
        <Learnset />
      </Container>

    </Container>
  )
}

export default PokedexMainRight;