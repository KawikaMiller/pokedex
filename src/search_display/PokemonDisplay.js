import React from "react";
import sprites from '../lib/sprites'

class PokemonDisplay extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      missingSprites: null
    }
  }

  getMissingSprite = () => {
    if (sprites[this.props.name]) {
      this.setState({
        missingSprites: sprites[this.props.name]
      })
    } else {
      this.setState({
        missingSprites: null
      })
    }
  }

  componentDidMount() {
    this.getMissingSprite();
  }

  render() {
    return(
      <>
        {
          // is props.id valid?
          this.props.id ? 
            this.state.missingSprites ? 
              this.props.formIdx === 0 ? 
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
              : 
                this.props.toggleShiny ? 
                  <img
                  src={this.state.missingSprites[this.props.formIdx - 1]}
                  /> 
                : 
                  <img
                  src={this.state.missingSprites[this.props.formIdx - 1]}
                  /> 
            : 
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
          : 
            null
          
          // if it is, check if we need to get missing sprites

          // if we do, then we need to cycle between the default sprite from pokeapi and the supplemental sprites from our imported module

          // if we don't need missing sprites, display the info from pokeapi
        }
      </>
    )
  }
}

export default PokemonDisplay;