// dependencies
import React from "react";
import axios from "axios";
// bootstrap components
import Container from "react-bootstrap/Container";
// my components & classes
import SearchBar from "./SearchBar";
import Pokedex from "./search_display/Pokedex";
import { Pokemon, Move } from "./lib/pokemon";



class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchInput: '',
      searchResult: null,
      searchError: null,
      cache: {},
    }
  }

  handleInputChange = (event) => {
    this.setState({
      searchInput: event.target.value.toLowerCase()
    })
  }

  handleNextPokemon = (event) => {
    console.log('next pokemon')
    if (this.state.searchResult) {
      this.handleSearch(event, this.state.searchResult.id + 1);      
    } else {
      this.handleSearch(event, 1)
    }
  }

  handlePreviousPokemon = (event) => {
    console.log('prev pokemon')
    if (this.state.searchResult) {
      this.handleSearch(event, this.state.searchResult.id - 1);      
    } else {
      this.handleSearch(event, 1)
    }
  }

  handleNextGen = (event) => {
    console.log('next generation')
    // if a search has been made and returned a result, then cycle up by generations
    if (this.state.searchResult) {
    // if you're viewing pokemon within gen 1, move to gen 2
      if (this.state.searchResult.id <= 151) {
        this.handleSearch(event, 152)
    // if you're viewing pokemon within gen 2, move to gen 3 & etc.
      } else if (this.state.searchResult.id <= 251) {
        this.handleSearch(event, 252)
      } else if (this.state.searchResult.id <= 251) {
        this.handleSearch(event, 252) 
      } else if (this.state.searchResult.id <= 386) {
        this.handleSearch(event, 387)
      } else if (this.state.searchResult.id <= 493) {
        this.handleSearch(event, 494)
      } else if (this.state.searchResult.id <= 649) {
        this.handleSearch(event, 650)
      } else if (this.state.searchResult.id <= 721) {
        this.handleSearch(event, 722)
      } else if (this.state.searchResult.id <= 809) {
        this.handleSearch(event, 810)
      } else if (this.state.searchResult.id <= 905) {
        this.handleSearch(event, 906)
      } else if (this.state.searchResult.id <= 906) {
        this.handleSearch(event, 1)
      }
    } else {this.handleSearch(event, 1)}
  }

  handlePreviousGen = (event) => {
    console.log('previous generation')
    // if a search has been made and returned a result, cycle back by generations
    if (this.state.searchResult) {
      // if within gen 9, move back to first starter of gen 8
      if (this.state.searchResult.id >= 906) {
        this.handleSearch(event, 810)
      // if within gen 8, move back to first starter of gen 7 & etc.
      } else if (this.state.searchResult.id >= 810) {
        this.handleSearch(event, 722)
      } else if (this.state.searchResult.id >= 722) {
        this.handleSearch(event, 650) 
      } else if (this.state.searchResult.id >= 650) {
        this.handleSearch(event, 494)
      } else if (this.state.searchResult.id >= 494) {
        this.handleSearch(event, 387)
      } else if (this.state.searchResult.id >= 387) {
        this.handleSearch(event, 252)
      } else if (this.state.searchResult.id >= 252) {
        this.handleSearch(event, 152)
      } else if (this.state.searchResult.id >= 152) {
        this.handleSearch(event, 1)
      } else if (this.state.searchResult.id >= 1) {
        this.handleSearch(event, 906)
      }
    // if no search has been made, move to gen 9
    } else {this.handleSearch(event, 906)}
  }

  handleSearchQueryEdgeCases = (searchQuery) => {
    switch (searchQuery) {
      case 'wormadam':
        return 'wormadam-plant';
      case 'basculin':
        return 'basculin-red-striped';
      case 'darmanitan':
        return 'darmanitan-standard';
      case 'zygarde':
        return 'zygarde-50';
      case 'giratina':
        return 'giratina-altered';
      default:
        return searchQuery;
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
    searchQuery = this.handleSearchQueryEdgeCases(searchQuery);
    let cacheKey = null // this.state.searchInput;
    if (this.state.cache[cacheKey]){
      this.setState({
        searchResult: this.state.cache[cacheKey]
      })
    }
    else {
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
        pokemon.height = {
          m: response.data.height / 10,
          ft: parseInt((response.data.height / 3.048).toFixed(2))
        };
        pokemon.weight = {
          kg: response.data.weight / 10,
          lb: parseInt((response.data.weight / 4.536).toFixed(2))
        };
        pokemon.forms = [];
        if (response.data.forms.length > 1) {
          response.data.forms.forEach(form => {
            let f = {
              name: form.name,
              url: form.url,
              apiId: form.url.match(/[^v]\d+/)[0].slice(1)
            }
            pokemon.forms.push(f);
          })
        }
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
          if (pokemon.forms.length === 0) {
            response.data.varieties.forEach(form => {
              let f = {
                name: form.pokemon.name,
                url: form.pokemon.url,
                apiId: form.pokemon.url.match(/[^v]\d+/)[0].slice(1),
              }
              pokemon.forms.push(f)
            })           
          }
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
        // Now that moves and abilities have been updated with supplemental info we set the searchResult state to pokemon (the instantiated Pokemon object) and add the pokemon to the cache
        // cache needs to be moved to backend once front end is finished
        // also need to use server to make proxy requests to pokeapi > api call needs to be moved to the backend and front end needs to make a call to the server
        // let newCache = this.state.cache;
        // newCache[cacheKey] = pokemon;
        this.setState({
          searchResult: pokemon,
          // cache: newCache
        })
      })
      .catch(error => {
        // if there is an error with the request, set state of searchError to the error received
        this.setState({
          searchError: error
        })
      })
    }
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
          handleNextGen={this.handleNextGen}
          handlePreviousGen={this.handlePreviousGen}
        />
      </Container>
    )
  }
}

export default Main;