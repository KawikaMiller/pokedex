import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import { useSelector } from "react-redux";

function BaseStats (props){

  const state = useSelector(state => state.pokemon)
  const placeholderStats = [
    {name: 'HP', base_stat: undefined},
    {name: 'ATK', base_stat: undefined},
    {name: 'DEF', base_stat: undefined},
    {name: 'SP.ATK', base_stat: undefined},
    {name: 'SP.DEF', base_stat: undefined},
    {name: 'SPD', base_stat: undefined}
  ]

  return(
    <>
      {/* renders a stat label, stat value, and stat progress bar for each pokemon stat (hp, atk, def, etc.) */}
      {state.pokemon ? 
        state.pokemon.stats.map(element => (
          <div 
            className="base_stat"
            key={`${element.name}_div`}
          >
          <strong
            id='stat_label'
            style={{
              margin: '0', 
              width: '35%'
            }} 
            key={`${element.name}_name`}
          >

            {element.name}
            <span style={{float: 'right'}}>
              {element.base_stat}            
            </span>
            
          </strong>

          <ProgressBar 
            min={1} 
            max={255} 
            now={element.base_stat}
            variant='success'
            key={`${element.name}_basestat`}
            className='base_stat_progressbar'            
          />
          
          </div>
        ))
      : 
        placeholderStats.map(element => (
          <div 
          className="base_stat"
          key={`${element.name}_div`}
          >
            <strong
              id='stat_label'
              style={{
                margin: '0', 
                width: '35%'
              }} 
              key={`${element.name}_name`}
            >
    
              {element.name}
              <span style={{float: 'right'}}>
                {element.base_stat}            
              </span>
              
            </strong>
    
            <ProgressBar 
              min={1} 
              max={255} 
              now={element.base_stat}
              variant='success'
              key={`${element.name}_basestat`}
              className='base_stat_progressbar'            
            />
            
          </div>
        ))
        }
    </>
  )
}

export default BaseStats;