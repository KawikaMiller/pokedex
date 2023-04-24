import React from "react";
// react-bootstrap components
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
// react components
import RightCard from "../RightCard";
import PokemonDisplay from "./PokemonDisplay";
import BaseStats from "./BaseStats";

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    console.log('POKEDEX CONSTRUCTOR PROPS: ', props)
    this.state = {
      searchResult: this.props.searchResult,
      toggleShiny: this.props.handleShinyToggle,
      toggleForm: false,
      formApiId: null,
      formIdx: 0,
    }
  }

  handleToggleShiny = () => {
    this.setState({
      toggleShiny: !this.state.toggleShiny
    })
  }

  handleToggleForm = () => {
    let newApiIdx = this.state.formIdx + 1;
    if (newApiIdx >= this.props.searchResult.forms.length) {
      newApiIdx = 0;
    }
    this.setState({
      formIdx: newApiIdx
    })
  }

  componentDidMount() {
    this.setState({
      searchResult: this.props.searchResult
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.setState({
        searchResult: this.props.searchResult,
        toggleShiny: false,
        formIdx: 0,
      })
    }
  }

  render() {
    return (
      <Container id='pokedex-container'>
        
        <CardGroup id='pokedex' >

          {/* left side card */}
          <Card bg='danger'>
            <Card.Header>
              {/* pokedex lights */}
              <div id="light-container">
                <div id="blue-light"></div>
                <div id="red-light"></div>
                <div id="yellow-light"></div>
                <div id="green-light"></div>
              </div>
            </Card.Header>

            <Card.Body>
              {/* displays pokemon picture */}
              <Container id='pokedex-display-border'>
                <Container id='pokedex-display'>
                  {this.props.searchResult ?
                    <PokemonDisplay 
                      name={this.props.searchResult.name}
                      id={this.props.searchResult.forms[this.state.formIdx].apiId} 
                      sprites={this.props.searchResult.sprites} 
                      key={`${this.props.searchResult.name}_display`}
                      toggleShiny={this.state.toggleShiny} 
                    /> 
                    : null
                  }
                </Container>
              </Container>

              <Container id='pokedex-bottom-ui'>
                
                <Container id='bottom-ui-circlebutton'>
                  <Container id='circlebutton' onClick={() => {
                    let audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${this.props.searchResult.name.toLowerCase()}.mp3`);
                    audio.play();
                  }}>                   
                  </Container>
                </Container>

                <Container id='bottom-ui-center'>

                  <Container id='bottom-ui-red-blue'>
                    <Button variant="success" onClick={this.handleToggleForm}></Button>
                    <Button onClick={this.handleToggleShiny}></Button>
                  </Container>

                  <Container id='bottom-ui-pokedex-info'>
                    {/* displays pokemon base stats */}
                    {this.props.searchResult ? 
                      <BaseStats 
                        stats={this.props.searchResult.stats} 
                        key={`${this.props.searchResult.name}_basestats`}
                      />
                      :
                      <BaseStats
                        stats={
                          [
                            {name: 'HP', base_stat: undefined},
                            {name: 'ATK', base_stat: undefined},
                            {name: 'DEF', base_stat: undefined},
                            {name: 'SP.ATK', base_stat: undefined},
                            {name: 'SP.DEF', base_stat: undefined},
                            {name: 'SPD', base_stat: undefined}
                          ]
                        }
                        key={`placeholder_basestats`}
                      />
                    }
                  </Container>     

                </Container>

                <Container id='bottom-ui-dpad'>
                    <div id='dpad-up' onClick={this.props.handleNextGen}></div>
                    <div id='dpad-left' onClick={this.props.handlePreviousPokemon}></div>
                    <div id='dpad-center'></div>
                    <div id='dpad-right' onClick={this.props.handleNextPokemon}></div>
                    <div id='dpad-down' onClick={this.props.handlePreviousGen}></div>
                </Container>

              </Container>
            </Card.Body>
          </Card>
          
          {/* right side card */}
          <RightCard searchResult={this.props.searchResult}/>

        </CardGroup>
      </Container>
      
    )
  }
}

export default Pokedex;