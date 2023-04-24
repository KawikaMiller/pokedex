import React from "react";

class PokemonDisplay extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      idModifier: null,
    }
  }
  
  render() {
    return(
      <>
        {this.props.id ?
          this.props.toggleShiny ? 
            <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${this.props.id}.png`}
            alt={`official shiny artwork for ${this.props.name}`}
            /> 
          :
            <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.id}.png`}
            alt={`official artwork for ${this.props.name}`}
            /> 
        : null
        }
      </>
    )
  }
}

export default PokemonDisplay;