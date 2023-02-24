import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ProgressBar from "react-bootstrap/ProgressBar";

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
              <Container id='pokdex-display-border'>
                <Container id='pokedex-display'>
                  {this.props.searchResult ?
                    <Card.Img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.searchResult.id}.png`} /> 
                    : null
                  }
                </Container>
              </Container>
              <Container id='pokedex-info' style={{marginTop: '0.5rem', backgroundColor: '#86d352', width: '40%', height: '30%'}}>

                {this.props.searchResult ? 
                <h4>{this.props.searchResult.name[0].toUpperCase() + this.props.searchResult.name.slice(1)}</h4> 
                : null}

                {this.props.searchResult ? 
                <Container style={{padding: 0}}>
                  {this.props.searchResult.stats.map(element => (
                    <div>
                      <ProgressBar 
                        min={1} 
                        max={255} 
                        now={element.base_stat}
                        variant='success'
                        label={element.stat.name}
                        style={{backgroundColor: 'rgba(255, 255, 255, 20%)', color: 'lime', height: '1.25vh', margin: '0.75vh'}}
                      />
                    </div>
                  ))}
                  {/* <ProgressBar 
                    min={1} 
                    max={255} 
                    now={this.props.searchResult.stats[0].base_stat}
                    variant='success'
                    style={{backgroundColor: 'rgba(255, 255, 255, 20%)', color: 'lime', height: '1vh'}}
                    /> */}
                </Container> 
                : null}

              </Container>
            </Card.Body>

            <Card.Footer>
              Footer
            </Card.Footer>
          </Card>

          <Card bg='danger'>

          </Card>

          </CardGroup>
      </Container>
      
    )
  }
}

export default Pokedex;