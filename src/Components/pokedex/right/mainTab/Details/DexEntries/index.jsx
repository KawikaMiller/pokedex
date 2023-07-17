import React from "react";
import { useSelector } from "react-redux";

import { Placeholder, Button } from "react-bootstrap";

function DexEntries({dexEntry, handleChangeDexEntry}) {

  const pokeState = useSelector(state => state.pokemon);
  const dexState = useSelector(state => state.pokedex);
  const settingsState = useSelector(state => state.settings);

  return(
    <>
      <Button 
        className={settingsState.theme}
        onClick={() => handleChangeDexEntry(-1)}
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
                  `Version: ${pokeState.pokemon?.descriptions[dexEntry].version}` 
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
            !dexState.isLoading ? 
            pokeState.pokemon?.descriptions[dexEntry].description
            : 
            <Placeholder animation="glow">
              <Placeholder style={{width: '400px'}} />
              <Placeholder style={{width: '350px'}} />
            </Placeholder>
          }

      </div>

      <Button 
        className={settingsState.theme}
        onClick={() => handleChangeDexEntry(1)}
        disabled={pokeState.pokemon?.name ? !dexState.isLoading ? false : true : true} 
      >
        {`>`}
      </Button>            
    </>
  )

}

export default DexEntries;