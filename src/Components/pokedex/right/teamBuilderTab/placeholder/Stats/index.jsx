import React, { useEffect, useState } from 'react';
import Stat from '../../Stat';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


import { useSelector, useDispatch } from 'react-redux';
import pokeSlice from '../../../../../../reduxStore/pokeSlice';
import teamSlice from '../../../../../../reduxStore/teamSlice';
import EditPokemon from '../../../../../forms/EditPokemon';

function PlaceholderStats(props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);
  const settingsState = useSelector(state => state.settings);
  const dispatch = useDispatch();
  let { modifyProperty } = pokeSlice.actions
  let { addToRoster } = teamSlice.actions

  const sortMoves = (arr) => {
    arr.sort((a,b) => {
      if(a.name < b.name){
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else return 0;
    })
  }

  const handleAddToRoster = (pokemon) => {
    if (teamState.roster.length >= 6){
      alert('There is no room on your team');
    } else{
      dispatch(addToRoster(pokemon))
    }
  }

  // sorts moves on component mount
  useEffect(() => {
    let sortedMoves = [...pokeState.pokemon.moves];
    sortMoves(sortedMoves);
    dispatch(modifyProperty({
      property: 'moves', 
      value: sortedMoves
    }));
  }, []) //eslint-disable-line

    return(
      <>
      <Container className='team_member_stats' >

        <div className='stats_sub_phys'>
          <Stat stat={pokeState.pokemon.stats[0]} />
          <Stat stat={pokeState.pokemon.stats[1]} />
          <Stat stat={pokeState.pokemon.stats[2]} />
        </div>

        <div className='stats_sub_spec'>
          <Stat stat={pokeState.pokemon.stats[3]} />
          <Stat stat={pokeState.pokemon.stats[4]} />
          <Stat stat={pokeState.pokemon.stats[5]} />
        </div>

        <div className='placeholder_buttons'>

          <Button
            className={settingsState.theme}
            onClick={() => setShowEditModal(!showEditModal)}
          >
            Edit
          </Button>

          <Button 
            variant='success' 
            onClick={() => dispatch(addToRoster(pokeState.pokemon))} 
          >
            + To Team
          </Button>
        </div>
      </Container>

      {showEditModal ? 
         <EditPokemon
          idx={undefined}
          pokemon={pokeState.pokemon} 
          showEditModal={showEditModal}
          toggleModal={() => setShowEditModal(!showEditModal)}  
        />
      : 
        null
      }

    </>
    )
}

export default PlaceholderStats;