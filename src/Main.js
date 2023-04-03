import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Pokedex from "./search_display/Pokedex";
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

  handleNextPokemon = (event) => {
    if (this.state.searchResult) {
      this.handleSearch(event, this.state.searchResult.id + 1);      
    } else {
      this.handleSearch(event, 1)
    }
  }

  handlePreviousPokemon = (event) => {
    if (this.state.searchResult) {
      this.handleSearch(event, this.state.searchResult.id - 1);      
    } else {
      this.handleSearch(event, 1)
    }
  }

  // handles API calls to pokeapi for various information about a pokemon
  handleSearch = async (event, searchQuery = this.state.searchInput) => {
    // prevents page from reloading on  search 'submit'
    event.preventDefault();
    // sets 'searchError' to null, just in case there was a previous error
    this.setState({
      searchError: null
    })
    // query pokeapi for a pokemon's information
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`)
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
        // if there are no moves from gen8, get gen7 moves. etc.
        if (moveArr.length === 0) {
          response.data.moves.forEach(element => {
            element.version_group_details.forEach(vgDetail => {
              if (vgDetail.version_group.name === 'sun-moon') {
                moveArr.push(new Move(
                  element.move.name,
                  vgDetail.level_learned_at,
                  vgDetail.move_learn_method.name,
                ))
              }
            })
          })
        }
        // gen 7 (X and Y)
        if (moveArr.length === 0) {
          response.data.moves.forEach(element => {
            element.version_group_details.forEach(vgDetail => {
              if (vgDetail.version_group.name === 'x-y') {
                moveArr.push(new Move(
                  element.move.name,
                  vgDetail.level_learned_at,
                  vgDetail.move_learn_method.name,
                ))
              }
            })
          })
        }
        // gen 6 (Black and White)
        if (moveArr.length === 0) {
          response.data.moves.forEach(element => {
            element.version_group_details.forEach(vgDetail => {
              if (vgDetail.version_group.name === 'black-2-white-2') {
                moveArr.push(new Move(
                  element.move.name,
                  vgDetail.level_learned_at,
                  vgDetail.move_learn_method.name,
                ))
              }
            })
          })
        }
       
        // reshaping the 'stats' property on the pokemon object
        let oldStats = response.data.stats;
        let newStats = [];
         // removes 'effort' property from response and replaces with 'ev', uncouples 'name' and 'url', add 'stat_value' property
        oldStats.forEach(element => {
          let newStat = {
            base_stat: element.base_stat,
            ev: 0,
            iv: 31,
            name: element.stat.name,
            url: element.stat.url,
            stat_value: 1,
          }
          newStats.push(newStat)
        })

        // renames stat names to abbreviated, all caps names
        newStats.forEach(element => {
          switch(element.name) {
            case 'hp' :
             element.name = 'HP';
             break;
            case 'attack' :
              element.name = 'ATK';
              break;
            case 'defense' :
              element.name = 'DEF';
              break;
            case 'special-attack' :
              element.name = 'SP.ATK';
              break;
            case 'special-defense' :
              element.name = 'SP.DEF';
              break;
            case 'speed' :
              element.name = 'SPD';
              break;
            default :
              console.log('error abbreviating stat name') 
          }
        }) 

        // create pokemon object which will ultimately be what is returned/sent as response
        let pokemon = new Pokemon(
          response.data.name,
          response.data.id,
          100,
          'bashful',
          response.data.abilities,
          moveArr,
          response.data.sprites,
          newStats,
          response.data.types,
        )
        return pokemon;
      })
      // gets supplemental move information for each move, such as power, accuracy, etc.
      .then(pokemon => {
        pokemon.moves.forEach(async move => {
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
            move.effectChance = res.data.effect_chance;
            move.description = res.data.effect_entries[0].short_effect.replace('$effect_chance', res.data.effect_chance)
          } catch (err) {
            console.log(err)
          }
        })
        // "pokemon" is the pokemon object created in previous .then
        return pokemon;
      })
      // gets type effectiveness (i.e. what types a pokemon is weak to, resistant to, immune to)
      .then(pokemon => {
        pokemon.types.forEach(async element => {
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

        return pokemon;
      })
      // gets every generation of pokedex entries
      .then (async pokemon => {
        
        try {
          let response = await axios(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name.split('-')[0]}`);
          response.data.flavor_text_entries.forEach(element => {
            if (element.language.name === 'en') {
              let description = {
                version: element.version.name,
                description: element.flavor_text.replace('', ' ')
              }
              pokemon.descriptions.push(description);
            }
          })
        } catch(err) {
          console.log(err)
        }
        return pokemon;
      })
      //gets ability descriptions
      .then(pokemon => {
        pokemon.abilities.forEach(async element => {
          try{
            let res = await axios(element.ability.url);
            element.description = res.data.effect_entries[1].effect;
          } catch (err) {
            console.log(err)
          }
        })
        // Now that moves and abilities have been updated with supplemental info we set the searchResult state to pokemon (the instantiated Pokemon object)
        this.setState({
          searchResult: pokemon
        })
      })
      .catch(error => {
        // if there is an error with the request, set state of searchError to the error received
        this.setState({
          searchError: error
        })
      })
  }

  render() {
    return(
      <Container>
        <SearchBar 
          handleSearch={this.handleSearch} 
          handleInputChange={this.handleInputChange} 
        />
        <Pokedex 
          searchResult={this.state.searchResult}
          handleNextPokemon={this.handleNextPokemon}
          handlePreviousPokemon={this.handlePreviousPokemon}
        />
      </Container>
    )
  }
}

export default Main;