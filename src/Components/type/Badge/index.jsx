import React from 'react';
import Badge from 'react-bootstrap/Badge';

function TypeBadge(props){

  return(
    <Badge bg={`${props.type}`}>{props.type[0].toUpperCase() + props.type.slice(1)}</Badge>
  )

}

export default TypeBadge;