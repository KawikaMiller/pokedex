import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

class BaseStats extends React.Component{
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render(){
    return(
      <>
        {this.props.stats.map((element, idx) => (
          <div 
            className="base_stat"
            key={`${element.stat.name}_div`}
          >
          <strong 
            style={{
              margin: '0', 
              fontSize: '0.85rem',
              width: '35%'
            }} 
            key={`${element.stat.name}_name`}
          >
            {element.stat.name === 'hp' ?
            'HP ' 
            :
            element.stat.name === 'attack' ?
            'ATK '
            :
            element.stat.name === 'defense' ?
            'DEF '
            :
            element.stat.name === 'special-attack' ?
            'SPATK '
            :
            element.stat.name === 'special-defense' ?
            'SPDEF '
            :
            element.stat.name === 'speed' ?
            'SPD '
            :
            null
            }
            <span style={{float: 'right'}}>
              {element.base_stat}            
            </span>
          </strong>

          <ProgressBar 
            min={1} 
            max={255} 
            now={element.base_stat}
            variant='success'
            key={`${element.stat.name}_basestat`}
            className='base_stat_progressbar'            
          />
          
          </div>
        ))}
      </>
    )
  }
}

export default BaseStats;