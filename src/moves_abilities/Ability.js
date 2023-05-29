import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

function Ability (props){
  const [description, setDescription] = useState('default');

  const componentDidMount = () => {
    setDescription(props.ability.description)
  }

  const componentDidUpdate = (prevProps) => {
    if(prevProps !== props) {
      setDescription(props.ability.description)
    }
  }

  return(
      <Accordion.Item eventKey={props.eventKey}>
        <Accordion.Header>{props.ability.name}</Accordion.Header>
        <Accordion.Body style={{overflowY: 'scroll', maxHeight: '9vh'}}>{description}</Accordion.Body>
      </Accordion.Item>
  )
}

export default Ability;