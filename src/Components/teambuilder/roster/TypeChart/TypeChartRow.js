import React from 'react'

function TypeChartRow (props){

  const typeEffectiveness = [
    {
      type: 'normal',
      effectiveness: 1
    },
    {
      type: 'fire',
      effectiveness: 1
    },
    {
      type: 'water',
      effectiveness: 1
    },
    {
      type: 'grass',
      effectiveness: 1
    },
    {
      type: 'electric',
      effectiveness: 1
    },
    {
      type: 'flying',
      effectiveness: 1
    },
    {
      type: 'bug',
      effectiveness: 1
    },
    {
      type: 'rock',
      effectiveness: 1
    },
    {
      type: 'ground',
      effectiveness: 1
    },
    {
      type: 'fighting',
      effectiveness: 1
    },
    {
      type: 'steel',
      effectiveness: 1
    },
    {
      type: 'poison',
      effectiveness: 1
    },
    {
      type: 'ice',
      effectiveness: 1
    },
    {
      type: 'dragon',
      effectiveness: 1
    },
    {
      type: 'ghost',
      effectiveness: 1
    },
    {
      type: 'psychic',
      effectiveness: 1
    },
    {
      type: 'dark',
      effectiveness: 1
    },
    {
      type: 'fairy',
      effectiveness: 1
    },
  ];

  const determineTypeEffectiveness = () => {

    props.typeInfo.forEach(element => {
      element.doubleDamageFrom.forEach(item => {
        typeEffectiveness.forEach(thing => {
          if (thing.type.toLowerCase() === item.toLowerCase()) {
            thing.effectiveness *= 2;
          }
        })
      })
    })

    props.typeInfo.forEach(element => {
      element.halfDamageFrom.forEach(item => {
        typeEffectiveness.forEach(thing => {
          if(thing.type.toLowerCase() === item.toLowerCase()) {
            thing.effectiveness /= 2;
          }
        })
      })
    })

    props.typeInfo.forEach(element => {
      element.noDamageFrom.forEach(item => {
        typeEffectiveness.forEach(thing => {
          if(thing.type.toLowerCase() === item.toLowerCase()) {
            thing.effectiveness = 0;
          }
        })
      })
    })
  }

  determineTypeEffectiveness();

  // useEffect(() => {
  //   setTypeEffectiveness(typeEffectiveness)
  // }, [])


  return(
    <tr key={`${props.typeInfo.name}_typechart_row`}>
      <td key={`${props.typeInfo.name}_label`}>
        <strong>
          {`${props.pokemonName[0].toUpperCase()}${props.pokemonName.slice(1).toLowerCase()}`}
        </strong>
      </td>
      {
        typeEffectiveness ? 
          typeEffectiveness.map(element => (
            <td>{`${element.effectiveness}x`}</td>
          )) 
        : 
          null 
      }
    </tr>
  )
}

export default TypeChartRow