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

  export const supplementMoveData = (pokemon) => async () => {
    // spread operators to avoid 'TypeError: object is not extensible / object is read only' errors
    console.log('supplementing move data with missing info...')
    let newPokemon = {...pokemon};
    let newMoves = []; 

    try {
      for(let move of pokemon.moves){
        console.log(`fetching ${move.name} data...`);
        axios(`https://pokeapi.co/api/v2/move/${move.name}`)
        //eslint-disable-next-line
        .then(res => {
          let newMove = {...move};
          newMove.power = res.data.power;
          newMove.accuracy = res.data.accuracy;
          newMove.pp = res.data.pp;
          newMove.priority = res.data.priority;
          newMove.dmgClass = res.data.damage_class.name;
          newMove.type = res.data.type.name;
          newMove.effectChange = res.data.effect_chance;

          if(!res.data.effect_entries[0]?.short_effect){
            newMove.description = 'pokeAPI missing this information';
          } else {
            newMove.description = res.data.effect_entries[0].short_effect.replace('$effect_chance', res.data.effect_chance)              
          };

          newMoves = [...newMoves, newMove];
          newPokemon.moves = newMoves;
        })
        .catch(e => console.error(e))
      }

    } 
    catch(e){
      console.error(e)
    }
    return newPokemon;
  }

  export const fetchTypeEffectiveness = (pokemon) => async () => {
    console.log('fetching type effectiveness...')
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
  }

  export const fetchPokedexEntries = (pokemon) => async () => {
    console.log('fetching pokedex entries for all generations of this pokemon...')
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
      });
      for(let i = 0; i < response.data.genera.length; i++){
        let current = response.data.genera[i];
        if (current.language.name === 'en'){
          pokemon.genus = current.genus;
          break;
        }
      };
      response.data.egg_groups.forEach(element => {
        pokemon.eggGroups.push(element.name);
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
      };
      pokemon.hatchTime = response.data.hatch_counter;
      pokemon.catchRate = response.data.capture_rate;
      pokemon.genderRate = response.data.gender_rate;
      pokemon.baseHappiness = response.data.base_happiness;
      pokemon.growthRate = response.data.growth_rate;

    } catch(err) {
      console.log(err)
    }
    return pokemon;
  }

  export const fetchAbilityDescriptions = (pokemon) => async () => {
    console.log('fetching ability descriptions...')
    let newPokemon = {...pokemon};
    let newAbilities = [];

    try {
      for (const ability of pokemon.abilities){
        let newAbility = {...ability};
        let response = await axios(ability.url);
        newAbility.description = response.data.effect_entries[1].effect;
        newAbilities = [...newAbilities, newAbility];
        newPokemon.abilities = newAbilities;
      }
    }
    catch(e){
      console.error(e)
    }

    return newPokemon;
  }

  export const fetchPokemon = (event, searchQuery) => async () => {
    console.log('fetching initial pokemon data...')
    // prevents page from reloading on  search 'submit'
    event.preventDefault();

    searchQuery = handleSearchQueryEdgeCases(searchQuery);

    // query pokeapi for a pokemon's information
    let response = axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`)
      .then(response => {

        let moveArr = [];
        // gets move info from initial query, construct a "Move" object with basic information
        response.data.moves.forEach(element => {
          moveArr.push({
            name: element.move.name,
            power: undefined,
            accuracy: undefined, 
            pp: undefined, 
            dmgClass: undefined, 
            type: undefined,
            description: '',
            versionDetails: element.version_group_details
          })
        });

        moveArr.forEach(move => {
          move.versionDetails.forEach((detail, idx) => {
            let temp = {
              levelLearned: detail.level_learned_at,
              learnMethod: detail.move_learn_method.name,
              version: detail.version_group.name
            };
            move.versionDetails[idx] = temp;
          });
        })


        // reshaping the 'stats' property on the pokemon object
        let oldStats = response.data.stats;
        let newStats = [];
        let evYields = [];

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
          evYields.push({
            name: element.stat.name,
            yield: element.effort
          })
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
        
        evYields.forEach(element => {
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

        pokemon.genus = '';
        pokemon.catchRate = 0;
        pokemon.eggGroups = [];
        pokemon.growthRate = '';
        pokemon.genderRate = 0;
        pokemon.hatchTime = 0;
        pokemon.baseHappiness = 0;
        pokemon.baseExpYield = response.data.base_experience;
        pokemon.evYields = evYields;

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

        let newAbilities = [];
        pokemon.abilities.forEach(ability => {
          let newObj = {};
          newObj.name = ability.ability.name;
          newObj.url = ability.ability.url;
          newObj.is_hidden = ability.is_hidden;
          newObj.slot = ability.slot;
          newObj.description = '';
          newAbilities.push(newObj);
        })

        pokemon.abilities = newAbilities;

        return pokemon;
    })
    return response
  }

  export const fetchTeamsFromServer = () => async () => {
    let allTeams;
    try {
      allTeams = await axios.get(`${process.env.REACT_APP_SERVER}/teams`, {
        withCredentials: true,
        credentials: 'include'
      });
      // console.log(allTeams);
    } catch(error) {
      console.log(error, ` | error getting teams from database`)
    }

    return allTeams;
  }

  export const loadTeamToClient = (teamId) => async () => {
    let foundTeam;
    try {
      foundTeam = await axios.get(`${process.env.REACT_APP_SERVER}/team?id=${teamId}`, {
        withCredentials: true,
        credentials: 'include'
      })
    } catch (err) {
      console.error(err, ' | error loading team from database')
    }
    return foundTeam;
  }

  export const saveTeamToServer = (teamName, roster, teamId, username) => async () => {
    let request = {
      teamName: teamName,
      pokemon: roster,
      trainer: username
    };

    let res = 'test';

    if(teamId){
      res = axios
        .put(`${process.env.REACT_APP_SERVER}/teams/${teamId}`, request, {
          withCredentials: true,
          credentials: 'include'
        })
        .catch(err => console.error('Could not overwrite team: ', err))
    } else {
      res = axios
        .post(`${process.env.REACT_APP_SERVER}/teams`, request, {
          withCredentials: true,
          credentials: 'include'
        })
        .catch(err => {console.log('Could not save new team', err)})      
    }

    return res;

  }

  export const deleteTeamInServer = (teamId) => async () => {
    let response;

    console.log('DELETE REQUEST FOR TEAM: ', teamId)
    response = axios
      .delete(`${process.env.REACT_APP_SERVER}/teams/${teamId}`, {
        withCredentials: true,
        credentials: 'include'
      })
      .then(() => axios.get(`${process.env.REACT_APP_SERVER}/teams`, {
        withCredentials: true,
        credentials: 'include'
      }))
      .catch(err => console.log(err))

    return response;
    
  }