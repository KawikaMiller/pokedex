import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Pokedex from "./Pokedex";

class Move {
  constructor(
    name=undefined, 
    levelLearned=undefined, 
    power=undefined, 
    accuracy=undefined, 
    pp=undefined, 
    dmgClass=undefined, 
    type=undefined
    ){
    this.name = name;
    this.levelLearned = levelLearned;
    this.power = power;
    this.accuracy = accuracy;
    this.pp = pp;
    this.dmgClass = dmgClass;
    this.type = type;
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
        response.data.moves.forEach(element => {
          moveArr.push(new Move(
            element.move.name, 
            element.version_group_details[0].level_learned_at,
            ));
        })
        return moveArr;
      })
      .then(response => {
        response.forEach(async move => {
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
      <>
      <SearchBar handleSearch={this.newHandleSearch} handleInputChange={this.handleInputChange} />
      <Pokedex searchResult={this.state.searchResult} />
      </>
    )
  }
}

export default Main;