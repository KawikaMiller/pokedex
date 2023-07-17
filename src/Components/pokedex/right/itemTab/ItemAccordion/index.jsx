import React from "react";

import Accordion from 'react-bootstrap/Accordion';
import pokedollar from '../../../../../assets/pokedollar.png';
import missingSprite from '../../../../../assets/missingSprite.png';

import { useSelector } from "react-redux";

function ItemAccordion(props){

  const settingsState = useSelector(state => state.settings);

  return(
    <Accordion.Item eventKey={props.eventKey} className={`${settingsState.theme} itemAccordion`}>
      <Accordion.Header className="itemAccordionHeader" style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <div className="item_sprite_and_name">
          <img 
            src={props.item.sprite ? props.item.sprite : missingSprite}
            alt={`Official sprite artwork for ${props.item.name}`}
          />
          <strong>{props.item.name}</strong>          
        </div>
        <div className="item_cost">
          <img
            className="pokedollar" 
            src={pokedollar}
            alt="The symbol for the currency used in Pokemon games"
          />{props.item.cost}               
        </div>
      </Accordion.Header>
      <Accordion.Body className={`${settingsState.theme} itemAccordionBody`}>
        {props.item.description}
      </Accordion.Body>
    </Accordion.Item>
  )

}

export default ItemAccordion;