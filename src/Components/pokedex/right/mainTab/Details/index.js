import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import Learnset from "../moves/LearnSet";
import TypeBadge from "../../../../type/Badge";

import dexSlice from "../../../../../reduxStore/dexSlice";
import { Placeholder } from "react-bootstrap";

function MainDetails(props) {

  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex);

  const { toggleIsLoading } = dexSlice.actions;

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
    <Card className='details' style={{height: '100%', maxHeight: '100%'}}>

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

    <Card.Body style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem', overflowY: 'auto'}}>

      {activeKey === 0 ?
      
      <>
        <Button disabled={pokeState.pokemon?.name ? !dexState.isLoading ? false : true : true} onClick={() => handleChangeDexEntry(-1)}>{`<`}</Button>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', margin: '0 0.5rem'}}>
            {
              pokeState.pokemon?.name ? 
                <h6>
                  {
                    !dexState.isLoading ? 
                    `Version: ${pokeState.pokemon?.descriptions[dexEntry].version}` 
                    : 
                    <Placeholder animation="glow">
                      <Placeholder style={{width: '200px'}} />
                    </Placeholder>
                  }
                </h6>
              :
                <p>--</p>
            }
            {
              !dexState.isLoading ? 
              pokeState.pokemon?.descriptions[dexEntry].description
              : 
              <Placeholder animation="glow">
                <Placeholder style={{width: '400px'}} />
                <Placeholder style={{width: '350px'}} />
              </Placeholder>
            }

        </div>
        <Button disabled={pokeState.pokemon?.name ? !dexState.isLoading ? false : true : true} onClick={() => handleChangeDexEntry(1)}>{`>`}</Button>            
      </>

      :

      activeKey === 1 ?

      <>
      <div className='centered spreadCol'>
        <div>
          <p className='underline'>Height & Weight</p>
          <p>
            {pokeState.pokemon?.name ?
              !dexState.isLoading ?
                `${pokeState.pokemon?.height.m} m | ${pokeState.pokemon?.weight.kg} kg`
              :
                <Placeholder animation="glow">
                  <Placeholder style={{width: '75%'}} />
                </Placeholder>
            :
              '--'
            }
          </p>              
        </div>
        <div>
          <p className='underline'>Gender Ratio</p>
          <p> 
            {pokeState.pokemon?.name ?
              !dexState.isLoading ?
                `${100 - (pokeState.pokemon?.genderRate / 8 * 100)} ♂ | ${pokeState.pokemon?.genderRate / 8 * 100}% ♀`
              :
                <Placeholder animation="glow">
                  <Placeholder style={{width: '75%'}} />
                </Placeholder>
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
            {pokeState.pokemon?.name ?
              !dexState.isLoading ?
                `${pokeState.pokemon?.catchRate}`
              :
                <Placeholder animation="glow">
                  <Placeholder style={{width: '75%'}} />
                </Placeholder>
            :
              '--'
            }
            
          </p>              
        </div>
        <div>
        <p className='underline'>Growth Rate</p>
          <p>
            {pokeState.pokemon?.name ?
              !dexState.isLoading ?
                `${pokeState.pokemon?.growthRate.name}`
              :
                <Placeholder animation="glow">
                  <Placeholder style={{width: '75%'}} />
                </Placeholder>
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
                !dexState.isLoading ?
                  pokeState.pokemon.eggGroups[1] ?
                    `${pokeState.pokemon.eggGroups[0]} | ${pokeState.pokemon.eggGroups[1]}`
                  :
                    `${pokeState.pokemon.eggGroups[0]}`
                :
                  <Placeholder animation="glow">
                    <Placeholder style={{width: '75%'}} />
                  </Placeholder>
              :
                '--'
            }
          </span>             
        </div>
        <div>
          <p className='underline'>Hatch Time</p>
          <p>
            {pokeState.pokemon?.name ?
              !dexState.isLoading ?
                `${pokeState.pokemon?.hatchTime} Cycles`
              :
                <Placeholder animation="glow">
                  <Placeholder style={{width: '75%'}} />
                </Placeholder>
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
              !dexState.isLoading ?
                `${pokeState.pokemon?.baseExpYield} EXP`
                :
                  <Placeholder animation="glow">
                    <Placeholder style={{width: '75%'}} />
                  </Placeholder>
              :
                '--'
            } 
          </p>              
        </div>
        <div>
          <p className='underline'>Ev Yield</p>
          <span>
            {pokeState.pokemon?.name ?
              !dexState.isLoading ?
                  pokeState.pokemon?.evYields.map(stat => {
                    if(stat.yield){
                      return `${stat.name} ${stat.yield} `;
                    } else{
                      return '';
                    }
                  })
                :
                  <Placeholder animation="glow">
                    <Placeholder style={{width: '75%'}} />
                  </Placeholder>
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
        <Button disabled={pokeState.pokemon?.name ? !dexState.isLoading ? false : true : true} onClick={() => handleChangeAbility(-1)}>{`<`}</Button>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', margin: '0 0.5rem'}}>

            {
              pokeState.pokemon?.name ? 
                <h6 style={{height: '10%'}}>
                  {
                    !dexState.isLoading ? 
                      pokeState.pokemon?.abilities[abilityKey].name
                    : 
                      <Placeholder animation="glow">
                        <Placeholder style={{width: '200px'}} />
                      </Placeholder>
                  }
                </h6>
              :
                <p>--</p>
            }
          {
            pokeState.pokemon?.name ?
              <p style={{maxHeight: '75%', overflowY: 'auto'}}>
                {
                  !dexState.isLoading ?
                    pokeState.pokemon?.abilities[abilityKey].description
                  :
                  <Placeholder animation="glow">
                    <Placeholder style={{width: '400px'}} />
                    <Placeholder style={{width: '350px'}} />
                  </Placeholder>                  
                }
              </p>                 
            :
              '--'
          }
        </div>
        <Button disabled={pokeState.pokemon?.name ? !dexState.isLoading ? false : true : true} onClick={() => handleChangeAbility(1)}>{`>`}</Button>            
      </>
      
      :

      null
        
      }

    </Card.Body>
  </Card>
  )

}

export default MainDetails;