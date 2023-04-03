import React from 'react';

import { sortMoves } from '../lib/movesLib';

class PokedexEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <>
        <div id='entry_header'>
          <p>{this.props.header1}</p>
          <p>{this.props.header2}</p>
        </div>
        <p id='entry_details'>
          {this.props.details}
        </p>      
      </>

    )
  }
}

export default PokedexEntry;