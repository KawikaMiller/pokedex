import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import itemsSlice from "../../../../../reduxStore/itemsSlice";
import dexSlice from "../../../../../reduxStore/dexSlice";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


function ItemCategories(){

  const [categoryFilters, setCategoryFilters] = useState([])

  const itemsState = useSelector(state => state.items);
  const dispatch = useDispatch();
  const { setAllPockets, setCategoryItems } = itemsSlice.actions;
  const { toggleIsLoading } = dexSlice.actions;


  const fetchItemInfo = async (items) => {
    let newItems = [];
    let promises = [];
    dispatch(toggleIsLoading(true));
    try{
      for(const item of items){
        console.log(`fetching ${item.name}data...`)
        let itemId = item.url.split('/')[6];
        promises.push(
          axios
            .get(`${process.env.REACT_APP_SERVER}/items/${itemId}`)
            .then(response => { //eslint-disable-line
              newItems = [...newItems, response.data]
            })        
        );
      };
    }
    catch(e){
      dispatch(toggleIsLoading(false));
      console.error(e)
    }
    return Promise.all(promises)
    .then(() => newItems)
  }

  const handleApply = () => {
    let promises = [];
    let allItems = [];

    for (const category of categoryFilters){
      promises.push(
        axios
        .get(category)
        .then(async res => { //eslint-disable-line
          let fetchedItems = await fetchItemInfo(res.data.items);
          allItems = [...allItems, ...fetchedItems] 
        })
      )
    }
    
    Promise
      .all(promises)
      .then(() => {
        dispatch(toggleIsLoading(false));
        dispatch(setCategoryItems(allItems));
      })
  }

  const handleReset = () => {
    let checkboxes = document.getElementsByClassName('form-check-input');
    for(const checkbox of checkboxes){
      checkbox.checked = false;
    }
    setCategoryFilters([]);
  }

  const handleCheckbox = (e, categoryUrl) => {
    if (e.target.checked){
      setCategoryFilters([...categoryFilters, categoryUrl])
    } else {
      let updatedFilters = [...categoryFilters].filter(element => element !== categoryUrl);
      setCategoryFilters(updatedFilters)
    }
  }

  // when component mounts, gets all pockets and their respective item categories that they hold
  useEffect(() => {
    if (!itemsState.allPockets.length){
      axios
      .get(`${process.env.REACT_APP_SERVER}/pockets`)
      // .then(response => fetchSubPockets(response.data.results))
      .then(response => dispatch(setAllPockets(response.data)))
    }
  }, [])//eslint-disable-line

  return(
    <Card id="itemPockets">
      <Card.Header id='itemPocketsHeader'>
        <strong>Pockets</strong>
      </Card.Header>
      <Card.Body id="itemPocketsBody">
        {itemsState.allPockets.map(pocket => (
          <>
            <h6 style={{textAlign: 'left', borderBottom: '1px solid white'}}>{pocket.name}</h6> 
            <Form>
              {pocket.categories.map(category => (
                <Form.Check
                  style={{textAlign: 'left'}} 
                  type='checkbox'
                  label={category.name}
                  // value={category.url}
                  onClick={(e) => handleCheckbox(e, category.url)}
                />
              ))}  
            </Form>         
          </>
        ))}        
      </Card.Body>
      <Card.Footer id='itemPocketsFooter'>
        <Button onClick={handleApply}>Apply</Button>
        <Button onClick={handleReset}>Reset</Button>
      </Card.Footer>
    </Card>
  )

}

export default ItemCategories;