import React from "react";
import { useSelector } from "react-redux";

import Placeholder from 'react-bootstrap/Placeholder'

function Bio() {

  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex);
  const settingsState = useSelector(state => state.settings);

  return(
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
  )

}

export default Bio;