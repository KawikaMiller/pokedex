import React from 'react'

import Card from "react-bootstrap/Card"
import { CardGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import PokedexEntry from './PokedexEntry';
import { sortMoves } from '../lib/movesLib';

class PokedexMainRight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      screenId: 0,
      dexEntryId: 0,
      moveEntryId: 0,
      sortedMoves: [],
      movesSorted: false,
    }
  }

  changeScreen = (screenID) => {
    if (this.state.screenId !== screenID) {
      this.setState({
        screenId: screenID
      })      
    }
  }

  nextDexEntry = () => {
    this.changeScreen(0)

    if (this.state.dexEntryId === this.props.pokemon.descriptions.length - 1) {
      this.setState({
        dexEntryId: 0
      })
    } else {
      this.setState({
        dexEntryId: this.state.dexEntryId + 1
      })      
    }
  }

  previousDexEntry = () => {
    this.changeScreen(0)

    if (this.state.dexEntryId === 0) {
      this.setState({
        dexEntryId: this.props.pokemon.descriptions.length - 1
      })
    } else {
      this.setState({
        dexEntryId: this.state.dexEntryId - 1
      })      
    }
  }

  nextMoveEntry = () => {
    this.changeScreen(1)

    if (this.props.pokemon || !this.state.movesSorted ) {
      let moves = this.props.pokemon.moves
      sortMoves(moves, 'name');
      this.setState({
        sortedMoves: moves,
        movesSorted: true
      })
    }

    if (this.state.moveEntryId === this.state.sortedMoves.length - 1) {
      this.setState({
        moveEntryId: 0
      })
    } else {
      this.setState({
        moveEntryId: this.state.moveEntryId + 1
      })      
    }
  }

  previousMoveEntry = () => {
    this.changeScreen(1)

    if (this.props.pokemon || !this.state.movesSorted ) {
      let moves = this.props.pokemon.moves
      sortMoves(moves, 'name');
      this.setState({
        sortedMoves: moves,
        movesSorted: true
      })
    }

    if (this.state.moveEntryId === 0) {
      this.setState({
        moveEntryId: this.state.sortedMoves.length - 1
      })
    } else {
      this.setState({
        moveEntryId: this.state.moveEntryId - 1
      })      
    }
  }

  render() {
    return(
      <>
      {/* black rectangle near top for displaying text */}
      <Container id='pokedex_entry_container'>
        {this.state.screenId === 0 && this.props.pokemon ?
          <PokedexEntry
            header1={this.props.pokemon.name[0].toUpperCase() + this.props.pokemon.name.slice(1)}
            header2={this.props.pokemon.id.toString().padStart(3, '0')}
            details={this.props.pokemon.descriptions[this.state.dexEntryId].description}
          />        
        :
        this.state.screenId === 1 && this.props.pokemon ?
          <PokedexEntry 
            header1={this.state.sortedMoves[this.state.moveEntryId].name}
            header2={this.state.sortedMoves[this.state.moveEntryId].dmgClass}
            details={this.state.sortedMoves[this.state.moveEntryId].description}
          />
        :
          'Please Search for a Pokemon'
        }

      </Container>

      {/* 10 blue buttons */}
      <Container style={{width: '80%', marginTop: '2rem', padding: '0'}}>
        <CardGroup id='main_right_blue_buttons'>

          <Card bg='primary'>
            <Card.Header onClick={this.nextDexEntry}>
              Dex ^
            </Card.Header>
            <Card.Footer onClick={this.previousDexEntry}>
              Dex ⌄
            </Card.Footer>
          </Card>

          <Card bg='primary'>
            <Card.Header onClick={this.nextMoveEntry}>
              Move +
            </Card.Header>
            <Card.Footer onClick={this.previousMoveEntry}>
              Move -
            </Card.Footer>
          </Card>

          <Card bg='primary'>
            <Card.Header>
              Abilty +
            </Card.Header>
            <Card.Footer>
              Ability -
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