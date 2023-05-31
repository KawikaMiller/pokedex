import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

function Ability (props){
  const [description, setDescription] = useState('default');

  useEffect(() => {
    setDescription(props.ability.description)
  }, [])

  useEffect(() => {
    setDescription(props.ability.description)
  }, [props])

  return(
      <Accordion.Item eventKey={props.eventKey}>
        <Accordion.Header>{props.ability.name}</Accordion.Header>
        <Accordion.Body style={{overflowY: 'scroll', maxHeight: '9vh'}}>{description}</Accordion.Body>
      </Accordion.Item>
  )
}

export default Ability;