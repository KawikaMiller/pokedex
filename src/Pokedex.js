import React from "react";
// import axios from "axios";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import RightCard from "./RightCard";
import PokemonDisplay from "./PokemonDisplay";
import BaseStats from "./BaseStats";
// import { AbilityInfo, AbilityArr } from "./lib/pokemon";
// import SideTabs from "./SideTabs";

class Pokedex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: this.props.searchResult
    }
  }

  componentDidMount() {
    this.setState({
      searchResult: this.props.searchResult
    })
  }

  render() {
    return(
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
              <Container id='pokdex-display-border'>
                <Container id='pokedex-display'>
                  {this.props.searchResult ?
                    <PokemonDisplay 
                      name={this.props.searchResult.name}
                      id={this.props.searchResult.id} 
                      sprites={this.props.searchResult.sprites} 
                      key={`${this.props.searchResult.name}_display`} 
                    /> 
                    : null
                  }
                </Container>
              </Container>

              <Container id='shiny-toggle'>
                {/* <Button style={{borderRadius: "50%", width: '7vh', height: '7vh', backgroundColor: 'darkslategray', border: 'none'}} ></Button> */}
                <Button style={{backgroundColor: 'red', borderColor: 'red'}}></Button>
                <Button></Button>
              </Container>

                {/*green box that displays pokemon stats */}
              <Container id='pokedex-info'>

                {/* displays pokemon name */}
                {this.props.searchResult ? 
                  <h4>
                    {this.props.searchResult.name[0].toUpperCase() + 
                    this.props.searchResult.name.slice(1)}
                  </h4> 
                  : null
                }
                
                {/* displays pokemon base stats */}
                {this.props.searchResult ? 
                  <BaseStats 
                    stats={this.props.searchResult.stats} 
                    key={`${this.props.searchResult.name}_basestats`}
                  />
                  : null
                }
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