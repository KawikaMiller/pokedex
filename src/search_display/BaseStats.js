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


        {/* renders a stat label, stat value, and stat progress bar for each pokemon stat (hp, atk, def, etc.) */}
        {this.props.stats ? 
          this.props.stats.map((element, idx) => (
            <div 
              className="base_stat"
              key={`${element.name}_div`}
            >
            <strong 
              style={{
                margin: '0', 
                fontSize: '0.85rem',
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
}

export default BaseStats;