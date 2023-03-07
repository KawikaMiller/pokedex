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
        {this.props.stats.map(element => (
          <div style={{display: 'flex', justifyContent: 'space-between', textAlign: 'start', margin: '0 0.5rem', alignItems: 'baseline'}} key={`${element.stat.name}_div`}>
          <p style={{margin: '0', fontSize: '0.85rem'}} key={`${element.stat.name}_name`}>{element.stat.name}</p>
          <ProgressBar 
            min={1} 
            max={255} 
            now={element.base_stat}
            label={element.base_stat}
            variant='success'
            style={{backgroundColor: 'rgba(255, 255, 255, 20%)', height: '1.3vh', margin: '0.75vh', width: '60%', float: 'right'}}
            key={`${element.stat.name}_basestat`}            
          />
          </div>
        ))}
      </>
    )
  }
}

export default BaseStats;