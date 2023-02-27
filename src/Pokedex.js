import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";

import MoveList from "./MoveList";

class Pokedex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }
  
  

  render() {
    return(
      <Container id='pokedex-container'>
        <CardGroup >

          <Card bg='danger'>
            <Card.Header>
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
                {/* <Container id='pokedex-display'>
                  {this.props.searchResult ?
                    <Card.Img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.searchResult.id}.png`} /> 
                    : null
                  }
                </Container> */}
              </Container>

              <Container id='shiny-toggle'>
                {/* <Button style={{borderRadius: "50%", width: '7vh', height: '7vh', backgroundColor: 'darkslategray', border: 'none'}} ></Button> */}
                <Button style={{backgroundColor: 'red', borderColor: 'red'}}></Button>
                <Button></Button>
              </Container>

                {/* displays pokemon stats */}
              <Container id='pokedex-info' style={{marginTop: '0.5rem', backgroundColor: '#86d352', width: '50%', height: '35%'}}>

                {/* {this.props.searchResult ? 
                <h4>{this.props.searchResult.name[0].toUpperCase() + this.props.searchResult.name.slice(1)}</h4> 
                : null}

                {this.props.searchResult ? 
                <Container style={{padding: 0}}>
                  {this.props.searchResult.stats.map(element => (
                    <div style={{display: 'flex', justifyContent: 'space-between', textAlign: 'start', margin: '0 0.5rem', alignItems: 'baseline'}}>
                      <p style={{margin: '0', fontSize: '0.85rem'}}>{element.stat.name}</p>
                      <ProgressBar 
                        min={1} 
                        max={255} 
                        now={element.base_stat}
                        variant='success'
                        style={{backgroundColor: 'rgba(255, 255, 255, 20%)', height: '1vh', margin: '0.75vh', width: '60%', float: 'right'}}
                      />
                    </div>
                  ))}
                </Container> 
                : null} */}

              </Container>
            </Card.Body>

            <Card.Footer>
              Footer
            </Card.Footer>
          </Card>

          <Card bg='danger'>
            <Container style={{height: '60vh', overflowY: 'scroll'}}>
              {/* {this.props.searchResult ?
                <MoveList moves={this.props.searchResult.moves} /> 
                : null } */}
            </Container>
          </Card>

        </CardGroup>
      </Container>
      
    )
  }
}

export default Pokedex;