import React from "react";

import Accordion from 'react-bootstrap/Accordion';
import pokedollar from '../../../../../assets/pokedollar.png';
import missingSprite from '../../../../../assets/missingSprite.png';

function ItemAccordion(props){


  return(
    <Accordion.Item eventKey={props.eventKey} className="itemAccordion">
      <Accordion.Header className="itemAccordionHeader">
        <div>
          <img 
            src={props.item.sprite ? props.item.sprite : missingSprite}
            alt={`Official sprite artwork for ${props.item.name}`}
          />
          <strong>{props.item.name}</strong>          
        </div>
        <div>
          <img
            className="pokedollar" 
            src={pokedollar}
            alt="The symbol for the currency used in Pokemon games"
          />{props.item.cost}               
        </div>
      </Accordion.Header>
      <Accordion.Body className="itemAccordionBody">
        {props.item.description}
      </Accordion.Body>
    </Accordion.Item>
  )

}

export default ItemAccordion;