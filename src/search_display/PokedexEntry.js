import React, { useState } from 'react';

function PokedexEntry (props) {

  return(
    <>
      <div id='entry_header'>
        <p>{props.header1}</p>
        <p>{props.header2}</p>
        <p>{props.header3}</p>
      </div>
      <p id='entry_details'>
        {props.details}
      </p>      
    </>
  )
}

export default PokedexEntry;