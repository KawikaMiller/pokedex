import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Pokedex from "./Pokedex";
import Container from "react-bootstrap/Container";
import { Pokemon, Move } from "./lib/pokemon";

// class Move {
//   constructor(
//     name=undefined, 
//     levelLearned=undefined, 
//     learnMethod=undefined,
//     power=undefined, 
//     accuracy=undefined, 
//     pp=undefined, 
//     dmgClass=undefined, 
//     type=undefined,
//     ){
//     this.name = name;
//     this.levelLearned = levelLearned;
//     this.learnMethod = learnMethod;
//     this.power = power;
//     this.accuracy = accuracy;
//     this.pp = pp;
//     this.dmgClass = dmgClass;
//     this.type = type;
//   }
// }

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

  newHandleSearch = async (event) => {
    // prevents page from reloading on  search 'submit'
    event.preventDefault();
    // sets 'searchError' to null, just in case there was a previous error
    this.setState({
      searchError: null
    })
    // query pokeapi for a pokemon's information
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.state.searchInput}`)
      .then(response => {
        // declare empty arr
        let moveArr = [];
        // gets move info from initial query, construct a "Move" object with basic information like name and level learned at
        response.data.moves.forEach(element => {
          element.version_group_details.forEach(vgDetail => {
            // only gets most recent move set (gen 9)
            if (vgDetail.version_group.name === 'scarlet-violet') {
              moveArr.push(new Move(
                element.move.name, 
                vgDetail.level_learned_at,
                vgDetail.move_learn_method.name,
                ))
            }
          })
        })
        // if there are no moves from gen9, get gen8 moves instead
        if (moveArr.length === 0) {
          response.data.moves.forEach(element => {
            element.version_group_details.forEach(vgDetail => {
              if (vgDetail.version_group.name === 'sword-shield') {
                moveArr.push(new Move(
                  element.move.name,
                  vgDetail.level_learned_at,
                  vgDetail.move_learn_method.name,
                ))
              }
            })
          })
        }
        // create pokemon object which will ultimately be what is returned/sent as response
        let pokemon = new Pokemon(
          response.data.name,
          response.data.id,
          100,
          'bashful',
          response.data.abilities,
          moveArr,
          response.data.sprites,
          response.data.stats,
          response.data.types,
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
            
            let res = await axios(request);

            move.power = res.data.power;
            move.accuracy = res.data.accuracy;
            move.pp = res.data.pp;
            move.priority = res.data.priority;
            move.dmgClass = res.data.damage_class.name;
            move.type = res.data.type.name;
          } catch (err) {
            console.log(err)
          }
        })
        // "response" is the pokemon object created in previous .then
        return response;
      })
      .then(response => {
        response.types.forEach(async element => {
          try{
            let res = await axios(element.type.url);

            element.doubleDamageFrom = [];
            element.halfDamageFrom = [];
            element.noDamageFrom = [];

            res.data.damage_relations.double_damage_from.forEach(async item => {
              element.doubleDamageFrom.push(item.name)
            });

            res.data.damage_relations.half_damage_from.forEach(async item => {
              element.halfDamageFrom.push(item.name)
            });

            res.data.damage_relations.no_damage_from.forEach(async item => {
              element.noDamageFrom.push(item.name)
            })
          } catch(err) {
            console.log(err)
          }
        })

        return response;
      })
      .then(response => {
        //gets ability descriptions
        response.abilities.forEach(async element => {
          try{
            let res = await axios(element.ability.url);
            element.description = res.data.effect_entries[1].effect;
          } catch (err) {
            console.log(err)
          }
        })
        // Now that moves and abilities have been updated with supplemental info we set the searchResult state to response (the instantiated Pokemon object)
        this.setState({
          searchResult: response
        })
      })
      .catch(error => {
        // if there is an error with the request, set state of searchError to the error received
        this.setState({
          searchError: error
        })
      })
      .finally(
        console.log(event)
      )
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