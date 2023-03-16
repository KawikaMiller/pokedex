import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

class Ability extends React.Component{
  constructor(props){
    super(props);
    this.state={
      description: this.props.ability.description
    }
  }

  componentDidMount(){
    this.setState({
      description: this.props.ability.description
    })
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