import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from "react-bootstrap/Container";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { useDispatch, useSelector } from 'react-redux';
import pokeSlice from '../../../reduxStore/pokeSlice';
import dexSlice from '../../../reduxStore/dexSlice';
import axios from 'axios';


function SearchBar (props) {

    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const pokeState = useSelector(state => state.pokemon)
    const settingsState = useSelector(state => state.settings)

    const dispatch = useDispatch();

    let { handleSearchInputChange, setPokemon } = pokeSlice.actions
    const { toggleIsLoading } = dexSlice.actions;
    

    const handleSearch = async (event, searchInput = pokeState.searchInput) => {
      event.preventDefault();

      if(searchInput === 'nidoran'){
        setShowModal(!showModal)
      } 
      else {
        dispatch(toggleIsLoading(true))
        try{
          console.log('searching...')
          let foundPokemon = await axios(`${process.env.REACT_APP_SERVER}/pokemon/${searchInput}`);
          dispatch(setPokemon(foundPokemon.data.pokemon))
          dispatch(toggleIsLoading(false))        
        }
        catch(e){
          console.error('COULD NOT FULFILL REQUEST', e);
          setShowAlert(!showAlert);
          dispatch(toggleIsLoading(false))
        }        
      }
    }

    const handleModalOptions = (e, input) => {
      dispatch(handleSearchInputChange(input));
      handleSearch(e, input);
      setShowModal(!showModal);
    }


    return(
      <Container>     
        <Form 
          onSubmit={handleSearch} 
          id='searchbar'
        >
          <Form.Control 
            id='search_input' 
            type="text" 
            placeholder='Search by name or id...' 
            onChange={(event) => dispatch(handleSearchInputChange(event.target.value.toLowerCase()))}
            value={pokeState.searchInput} />

          <Button 
            type='submit' 
            className={settingsState.theme}
            onClick={handleSearch} 
          >
            Search
          </Button>

        </Form>

        <ToastContainer  key='badsearch' id='badsearch_toast' position='bottom-center'>
          <Toast autohide delay={5000} show={showAlert} onClose={() => setShowAlert(!showAlert)}>

            <Toast.Header className={settingsState.theme}>
              <strong>Could not find any results</strong>
            </Toast.Header>

            <Toast.Body>
              Please double check your search query
            </Toast.Body>

          </Toast>
        </ToastContainer>

        <Modal className={settingsState.theme} centered show={showModal} onHide={() => setShowModal(!showModal)}>
          <Modal.Header>
            Did you mean...
          </Modal.Header>
          <Modal.Body style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Button type='submit' onClick={(e) => handleModalOptions(e, 'nidoran-m')}>
              Nidoran ♂
            </Button>
            <p style={{verticalAlign: 'middle', padding: '0', margin: '0'}}>OR</p>
            <Button type='submit' onClick={(e) => handleModalOptions(e, 'nidoran-f')}>
              Nidoran ♀
            </Button>
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      </Container>
    )
}

export default SearchBar;