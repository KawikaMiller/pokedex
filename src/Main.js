import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Pokedex from "./Pokedex";
import Container from "react-bootstrap/Container";

class Move {
  constructor(
    name=undefined, 
    levelLearned=undefined, 
    learnMethod=undefined,
    power=undefined, 
    accuracy=undefined, 
    pp=undefined, 
    dmgClass=undefined, 
    type=undefined,
    ){
    this.name = name;
    this.levelLearned = levelLearned;
    this.learnMethod = learnMethod;
    this.power = power;
    this.accuracy = accuracy;
    this.pp = pp;
    this.dmgClass = dmgClass;
    this.type = type;
  }
}

class Pokemon {
  constructor(
    name,
    id,
    types,
    stats,
    abilities,
    moves,
    sprites
  ){
    this.name = name;
    this.id = id;
    this.types = types;
    this.stats = stats;
    this.abilities = abilities;
    this.moves = moves;
    this.sprites = sprites;
  }
}

class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchInput: '',
      searchResult: null,
      searchError: null,
    }
  }

  handleInputChange = (event) => {
    this.setState({
      searchInput: event.target.value.toLowerCase()
    })
  }

  // handleSearch = async (event) => {
  //   event.preventDefault();
  //   this.setState({
  //     searchError: null
  //   })
  //   try {
  //     let request = {
  //       url: `https://pokeapi.co/api/v2/pokemon/${this.state.searchInput}`,
  //       method: 'GET'
  //     }

  //     let response = await axios(request);

  //     console.log(response.data);

  //     this.setState({
  //       searchResult: response.data
  //     })
  //   } catch (err) {
  //     console.log(err);
  //     this.setState({
  //       searchError: err
  //     })
  //   }
  // }

  newHandleSearch = async (event) => {
    event.preventDefault();
    this.setState({
      searchError: null
    })

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.searchInput}`)
      .then(response => {
        let moveArr = [];
        // gets move info from initial query, "moves" only has basic information like name and level learned at
        response.data.moves.forEach(element => {
          moveArr.push(new Move(
            element.move.name, 
            element.version_group_details[0].level_learned_at,
            element.version_group_details[0].move_learn_method.name,
            ));
        })
        // create pokemon object which will ultimately be what is returned/sent as response
        let pokemon = new Pokemon(
          response.data.name,
          response.data.id,
          response.data.types,
          response.data.stats,
          response.data.abilities,
          moveArr,
          response.data.sprites
        )
        return pokemon;
      })
      .then(response => {
        // gets supplemental move information for each move, such as power, accuracy, etc.
        response.moves.forEach(async move => {
          try {
            let request = {
              url: `https://pokeapi.co/api/v2/move/${move.name}`,
              method: 'GET'
            }
            
            let response = await axios(request);

            move.power = response.data.power;
            move.accuracy = response.data.accuracy;
            move.pp = response.data.pp;
            move.dmgClass = response.data.damage_class.name;
            move.type = response.data.type.name;
          } catch (err) {
            console.log(err)
          }
        })
        // "response" is the pokemon object created in previous .then, now that moves have been updated with supplemental info we set the searchResult state to response (the pokemon object)
        this.setState({
          searchResult: response
        })
      })
      .catch(error => {
        this.setState({
          searchError: error
        })
      })
  }

  render() {
    return(
      <Container>
        <SearchBar handleSearch={this.newHandleSearch} handleInputChange={this.handleInputChange} />
        <Pokedex searchResult={this.state.searchResult} />
      </Container>
    )
  }
}

export default Main;