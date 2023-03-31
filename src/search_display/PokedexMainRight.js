import React from 'react'

import Card from "react-bootstrap/Card"
import { CardGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class PokedexMainRight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <>
      {/* black rectangle near top for displaying text */}
      <Container style={{width: '80%', height: '25%', backgroundColor: 'rgb(25, 25, 25)', marginTop: '6rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <p style={{padding: '0.5rem'}}>{this.props.pokemon ? 
          this.props.pokemon.descriptions[6].description
        :
          null}
        </p>
      </Container>

      {/* 10 blue buttons */}
      <Container style={{width: '80%', marginTop: '2rem', padding: '0'}}>
        <CardGroup>

          <Card bg='primary'>
            <Card.Header>
              1
            </Card.Header>
            <Card.Footer>
              1
            </Card.Footer>
          </Card>

          <Card bg='primary'>
            <Card.Header>
              2
            </Card.Header>
            <Card.Footer>
              2
            </Card.Footer>
          </Card>

          <Card bg='primary'>
            <Card.Header>
              3
            </Card.Header>
            <Card.Footer>
              3
            </Card.Footer>
          </Card>

          <Card bg='primary'>
            <Card.Header>
              4
            </Card.Header>
            <Card.Footer>
              4
            </Card.Footer>
          </Card>

          <Card bg='primary'>
            <Card.Header>
              5
            </Card.Header>
            <Card.Footer>
              5
            </Card.Footer>
          </Card>

        </CardGroup>
      </Container>


      <Container style={{width: '80%', marginTop: '1rem', padding: '0'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', float: 'right', width: '40%', padding: '0'}}>
          <Button style={{width: '47.5%'}}></Button>
          <Button style={{width: '47.5%'}}></Button>                
        </div>
      </Container>

      <Container style={{width: '80%', marginTop: '1rem', padding: '0' }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{width: '40%', height: '5rem'}}>
            <CardGroup style={{height: '100%'}}>
              <Card>
                1
              </Card>
              <Card>
                2
              </Card>
            </CardGroup>
          </div>
          <div>
            <div style={{backgroundColor: 'gold', width: '4rem', height: '4rem', borderRadius: '50%'}}>

            </div>
          </div>
        </div>
      </Container>

      <Container style={{width: '80%', height: '10%', marginTop: '3rem', padding: '0'}}>
          <CardGroup style={{display: 'flex', justifyContent: 'space-between', height: '100%'}}>
            <Card style={{backgroundColor: 'grey', width: '40%', margin: '0 2rem 0 0'}}>

            </Card>
            <Card style={{backgroundColor: 'grey', width: '40%', margin: '0 0 0 2rem'}}>

            </Card>
          </CardGroup> 
      </Container>       
    </> 

    )
  }
}

export default PokedexMainRight;