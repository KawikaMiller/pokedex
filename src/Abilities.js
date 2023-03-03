import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Ability from './Ability';

class Abilities extends React.Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render() {
    return(
      <Accordion defaultActiveKey='0'>
        {this.props.abilities ? 
          this.props.abilities.map((abilityData, idx) => <Ability ability={abilityData} eventKey={idx} key={`ability_${idx}`}/>)
        : 'no abilities found'}
      </Accordion>
    )
  }
}

export default Abilities;