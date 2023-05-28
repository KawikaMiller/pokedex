  import { Pokemon } from "../../lib/pokemon";
  import axios from "axios";

  // reformat edge case search queries because of how pokeapi is set up
  const handleSearchQueryEdgeCases = (searchQuery) => {
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
  export const fetchPokemonData = (event, searchQuery) => async () => {

    // prevents page from reloading on  search 'submit'
    event.preventDefault();

    searchQuery = handleSearchQueryEdgeCases(searchQuery);

    // query pokeapi for a pokemon's information
    let response = axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`)
      .then(response => {

        let moveArr = [];
        // gets move info from initial query, construct a "Move" object with basic information like name and level learned at
        response.data.moves.forEach(element => {
          element.version_group_details.forEach(vgDetail => {
            // only gets most recent move set (gen 9)
            if (vgDetail.version_group.name === 'scarlet-violet') {
              moveArr.push({
                // cant use Move constructor with redux because it will throw a 'non-serializable' error
                // need to include undefined properties otherwise a TypeError: object is not extensible will occur
                name: element.move.name, 
                levelLearned: vgDetail.level_learned_at,
                learnMethod: vgDetail.move_learn_method.name,
                power: undefined, 
                accuracy: undefined, 
                pp: undefined, 
                dmgClass: undefined, 
                type: undefined,
              })
            }
          })
        })
        // if there are no moves from gen9, get gen8 moves instead
        if (moveArr.length === 0) {
          response.data.moves.forEach(element => {
            element.version_group_details.forEach(vgDetail => {
              if (vgDetail.version_group.name === 'sword-shield') {
                moveArr.push({
                  name: element.move.name, 
                  levelLearned: vgDetail.level_learned_at,
                  learnMethod: vgDetail.move_learn_method.name,
                  power: undefined, 
                  accuracy: undefined, 
                  pp: undefined, 
                  dmgClass: undefined, 
                  type: undefined,
                })
              }
            })
          })
        }
        // if there are no moves from gen8, get gen7 moves. etc.
        if (moveArr.length === 0) {
          response.data.moves.forEach(element => {
            element.version_group_details.forEach(vgDetail => {
              if (vgDetail.version_group.name === 'sun-moon') {
                moveArr.push({
                  name: element.move.name, 
                  levelLearned: vgDetail.level_learned_at,
                  learnMethod: vgDetail.move_learn_method.name,
                  power: undefined, 
                  accuracy: undefined, 
                  pp: undefined, 
                  dmgClass: undefined, 
                  type: undefined,
                })
              }
            })
          })
        }
        // gen 7 (X and Y)
        if (moveArr.length === 0) {
          response.data.moves.forEach(element => {
            element.version_group_details.forEach(vgDetail => {
              if (vgDetail.version_group.name === 'x-y') {
                moveArr.push({
                  name: element.move.name, 
                  levelLearned: vgDetail.level_learned_at,
                  learnMethod: vgDetail.move_learn_method.name,
                  power: undefined, 
                  accuracy: undefined, 
                  pp: undefined, 
                  dmgClass: undefined, 
                  type: undefined,
                })
              }
            })
          })
        }
        // gen 6 (Black and White)
        if (moveArr.length === 0) {
          response.data.moves.forEach(element => {
            element.version_group_details.forEach(vgDetail => {
              if (vgDetail.version_group.name === 'black-2-white-2') {
                moveArr.push({
                  name: element.move.name, 
                  levelLearned: vgDetail.level_learned_at,
                  learnMethod: vgDetail.move_learn_method.name,
                  power: undefined, 
                  accuracy: undefined, 
                  pp: undefined, 
                  dmgClass: undefined, 
                  type: undefined,
                })
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
            let newMove = {...move};

            newMove.power = res.data.power;
            newMove.accuracy = res.data.accuracy;
            newMove.pp = res.data.pp;
            newMove.priority = res.data.priority;
            newMove.dmgClass = res.data.damage_class.name;
            newMove.type = res.data.type.name;
            newMove.effectChance = res.data.effect_chance;
            newMove.description = res.data.effect_entries[0].short_effect.replace('$effect_chance', res.data.effect_chance) || res.data.effect_entries[0].effect.replace('$effect_chance', res.data.effect_chance)

            move = newMove;

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
            // need to do following line to prevent TypeError: 'obj is not extensible'
            let newEl = {...element};
            newEl.description = res.data.effect_entries[1].effect;
            element = newEl;
          } catch (err) {
            console.log(err)
          }
        })
        return pokemon;
      })
      .catch(error => {
        console.error(error)
      })
    return response
  }