import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';

class Ability extends React.Component{
  constructor(props){
    super(props);
    this.state={
      description: 'lorem ipsum leviosah'
    }
  }

  getAbilityDescription = async (ability) => {
    try {
      let response = await axios(ability.ability.url);

      this.setState({
        description: response.data.effect_entries[1].effect
      })
    } catch(err) {console.log(err)}
  }

  componentDidMount(){
    this.getAbilityDescription(this.props.ability)
  }

  render() {
    return(
        <Accordion.Item eventKey={this.props.eventKey}>
          <Accordion.Header>{this.props.ability.ability.name}</Accordion.Header>
          <Accordion.Body style={{overflowY: 'scroll', maxHeight: '8vh'}}>{this.state.description}</Accordion.Body>
        </Accordion.Item>
    )
  }
}

export default Ability;