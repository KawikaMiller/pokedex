export const determineTypeEffectiveness = (typeInfo) => {

  let typeEffectiveness = [
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

  typeInfo.forEach(element => {
    element.doubleDamageFrom.forEach(item => {
      typeEffectiveness.forEach(element => {
        if (element.type.toLowerCase() === item.toLowerCase()) {
          element.effectiveness *= 2;
        }
      })
    })
  })

  typeInfo.forEach(element => {
    element.halfDamageFrom.forEach(item => {
      typeEffectiveness.forEach(element => {
        if(element.type.toLowerCase() === item.toLowerCase()) {
          element.effectiveness /= 2;
        }
      })
    })
  })

  typeInfo.forEach(element => {
    element.noDamageFrom.forEach(item => {
      typeEffectiveness.forEach(element => {
        if(element.type.toLowerCase() === item.toLowerCase()) {
          element.effectiveness = 0;
        }
      })
    })
  })

  return typeEffectiveness;
}