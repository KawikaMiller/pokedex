import React from "react";
import { useSelector } from "react-redux";

import Button from 'react-bootstrap/Button';
import Placeholder from 'react-bootstrap/Placeholder';

function AbilityDetails({abilityKey, handleChangeAbility}) {

  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex);
  const settingsState = useSelector(state => state.settings);

  return(
    <>
      <Button 
        className={settingsState.theme}
        onClick={() => handleChangeAbility(-1)}
        disabled={pokeState.pokemon?.name ? !dexState.isLoading ? false : true : true} 
      >
        {`<`}
      </Button>
      <div className='details_text'>
          {
            pokeState.pokemon?.name ? 
              <h6>
                {
                  !dexState.isLoading ? 
                    pokeState.pokemon?.abilities[abilityKey].name
                  : 
                    <Placeholder animation="glow">
                      <Placeholder style={{width: '200px'}} />
                    </Placeholder>
                }
              </h6>
            :
              <p>--</p>
          }
        {
          pokeState.pokemon?.name ?
            <p>
              {
                !dexState.isLoading ?
                  pokeState.pokemon?.abilities[abilityKey].description
                :
                <Placeholder animation="glow">
                  <Placeholder style={{width: '400px'}} />
                  <Placeholder style={{width: '350px'}} />
                </Placeholder>                  
              }
            </p>                 
          :
            '--'
        }
      </div>
      <Button 
        className={settingsState.theme}
        onClick={() => handleChangeAbility(1)}
        disabled={pokeState.pokemon?.name ? !dexState.isLoading ? false : true : true} 
      >
        {`>`}
      </Button>            
    </>
  )

}

export default AbilityDetails;