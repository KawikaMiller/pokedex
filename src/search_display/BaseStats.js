import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function BaseStats (props){

  return(
    <>
      {/* renders a stat label, stat value, and stat progress bar for each pokemon stat (hp, atk, def, etc.) */}
      {props.stats ? 
        props.stats.map((element, idx) => (
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
        null}
    </>
  )
}

export default BaseStats;