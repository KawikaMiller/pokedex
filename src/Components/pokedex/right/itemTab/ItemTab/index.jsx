import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import itemsSlice from "../../../reduxStore/itemsSlice";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

// import ItemInfo from "../ItemInfo";
import ItemCategories from "../ItemCategories";
import ItemAccordion from "../ItemAccordion";
import { Accordion } from "react-bootstrap";

function ItemTab(){
  const [filter, setFilter] = useState('');
  const [shownItems, setShownItems] = useState([]);

  const itemsState = useSelector(state => state.items);
  const dexState = useSelector(state => state.pokedex);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  useEffect(() => {
    setShownItems(
      itemsState.categoryItems.filter(item => item.name.includes(filter) || item.description.includes(filter))
    )
  }, [itemsState.categoryItems, filter])

  return(
    <div id='itemTabOuter'>

      <ItemCategories />

      <div id='itemsContainerParent'>
        <InputGroup>
          <InputGroup.Text>Filter</InputGroup.Text>
          <Form.Control
            id='itemFilter' 
            type='text'
            placeholder='Item name or description...'
            onChange={handleFilterChange}
          />
        </InputGroup>

        <div id="itemsContainer">
          {
            !dexState.isLoading ?
              <Accordion id='itemsAccordion'>
                {shownItems.map((item, idx) => <ItemAccordion eventKey={idx} item={item}/> )}                
              </Accordion>

            :
              <div id='itemsLoading'>
                <Spinner animation="grow" role="status" variant="light">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <Spinner animation="grow" role="status" variant="light">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <Spinner animation="grow" role="status" variant="light">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>              
              </div>
          }

        </div>

      </div>

    </div>
  )

}

export default ItemTab;