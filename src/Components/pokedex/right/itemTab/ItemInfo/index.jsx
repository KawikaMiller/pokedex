import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import teamSlice from '../../../reduxStore/teamSlice';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function ItemInfo(){

  const itemsState = useSelector(state => state.items);
  const dispatch = useDispatch();
  const {} = teamSlice.actions;

  return(
    <Card>
      <Card.Header>{itemsState.activeItem.name}</Card.Header>
      <Card.Body style={{display: 'flex'}}>
        <img 
          src=''
          alt=''
        />
        <div style={{display: 'flex'}}>
          <Button>{`<`}</Button>
          <p>{itemsState.activeItem.description}</p>
          <Button>{`>`}</Button>
        </div>
      </Card.Body>
    </Card>
  )

}

export default ItemInfo;