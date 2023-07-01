import React, { useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import itemsSlice from "../../../reduxStore/itemsSlice";

import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


function ItemCategories(){

  const itemsState = useSelector(state => state.items);
  const dispatch = useDispatch();
  const { setAllPockets, setCategoryItems } = itemsSlice.actions;

  // fetches all item categories that belong to a pocket
  const fetchSubPockets = async (mainPockets) => {
    let newMainPockets = [];
    try{
      for(const pocket of mainPockets){
        console.log(`fetching ${pocket.name} data...`)
        let res = await axios(pocket.url);
        let nPocket = {
          ...pocket, 
          categories: res.data.categories.sort((a, b) => {
            if (a.name > b.name){
              return 1
            } else if (a.name < b.name){
              return -1
            } else return 0;
          })
        };
        newMainPockets = [...newMainPockets, nPocket];
      }
    }
    catch(e){
      console.error(e)
    }
    return newMainPockets;
  }

  const fetchItemInfo = async (items) => {
    let newItems = [];
    let promises = [];
    try{
      for(const item of items){
        console.log(`fetching ${item.name}data...`)
        let itemId = item.url.split('/')[6];
        promises.push(
          axios
            .get(`${process.env.REACT_APP_SERVER}/items/${itemId}`)
            .then(response => {
              newItems = [...newItems, response.data]
            })        
        );
      };
    }
    catch(e){
      console.error(e)
    }
    Promise.all(promises)
    .then(res => {
      console.log('PROMISE ALL, NEW ITEMS: ', newItems)
      dispatch(setCategoryItems(newItems))
    })
  }

  // fetches all items within a category
  const fetchCategoryItems = (url) => {
    axios
      .get(url)
      .then(response => {
        fetchItemInfo(response.data.items);
      })
  }

  const handleClick = (url) => {
    fetchCategoryItems(url);
  }

  // when component mounts, gets all pockets and their respective item categories that they hold
  useEffect(() => {
    if (!itemsState.allPockets.length){
      axios
      .get('https://pokeapi.co/api/v2/item-pocket/')
      .then(response => fetchSubPockets(response.data.results))
      .then(pockets => dispatch(setAllPockets(pockets)))
    }
  }, [])//eslint-disable-line



  return(
    <Card id="itemPockets">
      <Card.Header id='itemPocketsHeader'>
        <strong>Pockets</strong>
      </Card.Header>
      <Card.Body id="itemPocketsBody">
        {itemsState.allPockets.map(pocket => (
          <Accordion>
            <Accordion.Header>{pocket.name}</Accordion.Header>
            <Accordion.Body className="categoryAccordionBody">
                {pocket.categories.map(category => (
                  <Button size='sm' onClick={() => handleClick(category.url)}>{category.name}</Button>
                ))}
            </Accordion.Body>
          </Accordion>
        ))}        
      </Card.Body>

    </Card>
  )

}

export default ItemCategories;