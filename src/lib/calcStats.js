// referenced when determining how nature affects stats
export const natureModifiers = [
  {
    name: 'Lonely',
    buff: 'ATK',
    debuff: 'DEF',  
  },
  {
    name: 'Adamant',
    buff: 'ATK',
    debuff: 'SP.ATK',  
  },
  {
    name: 'Naughty',
    buff: 'ATK',
    debuff: 'SP.DEF',  
  },
  {
    name: 'Brave',
    buff: 'ATK',
    debuff: 'SPD',  
  },
  {
    name: 'Bold',
    buff: 'DEF',
    debuff: 'ATK',  
  },
  {
    name: 'Impish',
    buff: 'DEF',
    debuff: 'SP.ATK',  
  },
  {
    name: 'Lax',
    buff: 'DEF',
    debuff: 'SP.DEF',  
  },
  {
    name: 'Relaxed',
    buff: 'DEF',
    debuff: 'SPD',  
  },
  {
    name: 'Modest',
    buff: 'SP.ATK',
    debuff: 'ATK',  
  },
  {
    name: 'Mild',
    buff: 'SP.ATK',
    debuff: 'DEF',  
  },
  {
    name: 'Rash',
    buff: 'SP.ATK',
    debuff: 'SP.DEF',  
  },
  {
    name: 'Quiet',
    buff: 'SP.ATK',
    debuff: 'SPD',  
  },
  {
    name: 'Calm',
    buff: 'SP.DEF',
    debuff: 'ATK',  
  },
  {
    name: 'Gentle',
    buff: 'SP.DEF',
    debuff: 'DEF',  
  },
  {
    name: 'Careful',
    buff: 'SP.DEF',
    debuff: 'SP.ATK',  
  },
  {
    name: 'Sassy',
    buff: 'SP.DEF',
    debuff: 'SPD',  
  },
  {
    name: 'Timid',
    buff: 'SPD',
    debuff: 'ATK',  
  },
  {
    name: 'Hasty',
    buff: 'SPD',
    debuff: 'DEF',  
  },
  {
    name: 'Jolly',
    buff: 'SPD',
    debuff: 'SP.ATK',  
  },
  {
    name: 'Naive',
    buff: 'SPD',
    debuff: 'SP.DEF',  
  }
]
// determines how nature affects stats
export const getNatureModifier = (natureModifiersArr, pokemonNature, affectedStatName) => {
  // nature will be undefined if pokemon has a neutral nature (nature that does not buff/debuff any stat)
  let nature = natureModifiersArr.find(nature => nature.name.toLowerCase() === pokemonNature);
  let modifier = 1;

  // if nature is undefined, modifier stays at 1
  if (nature) {
    if (nature.buff === affectedStatName) {
      modifier = 1.1;
    } else if (nature.debuff === affectedStatName) {
      modifier = 0.9;
    }      
  }

  return modifier;
}

export const calculateStatTotal = (statName, baseStat, iv, ev, lvl, nature) => {
  const natureModifier = getNatureModifier(natureModifiers, nature, statName);

  return Math.floor(((Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * lvl) / 100)) + 5) * natureModifier);
}

export const calculateHpTotal = (baseStat, iv, ev, lvl) => {
  return Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * lvl) / 100) + lvl + 10;
}

export const calculateMaxStatTotal = (baseStat, iv, level, nature) => {
  return Math.floor(((Math.floor(((2 * baseStat + iv + Math.floor(255 / 4)) * level) / 100)) + 5) * nature)
}

export const calculateMinStatTotal = (baseStat, iv, level, nature) => {
  return Math.floor(((Math.floor(((2 * baseStat + iv + Math.floor(0 / 4)) * level) / 100)) + 5) * nature)
}

export const calculateMaxHpTotal = (baseStat, iv, level) => {
  return Math.floor(((2 * baseStat + iv + Math.floor(255 / 4)) * level) / 100) + level + 10
}

export const calculateMinHpTotal = (baseStat, iv, level) => {
  return Math.floor(((2 * baseStat + iv + Math.floor(0 / 4)) * level) / 100) + level + 10
}