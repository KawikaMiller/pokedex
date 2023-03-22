export class Pokemon {
  constructor(name, id, level, nature, abilities = [], moves = [], sprite, stats, types ) {
    this.name = name;
    this.nickname = undefined;
    this.id = id;
    this.level = level;
    this.nature = nature;
    this.abilities = abilities;
    this.moves = moves;
    this.sprite = sprite;
    this.stats = stats;
    this.types = types;
    this.battleAbility = undefined;
    this.battleMoves = undefined;
    this.heldItem = undefined;
  }
}

export class Stats {
  constructor(hp, atk, def, spatk, spdef, spd) {
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.spatk = spatk;
    this.spdef = spdef;
    this.spd = spd;
  }
}

export class StatInfo {
  constructor(statName, baseStat, iv, ev) {
    this.statName = statName;
    this.baseStat = baseStat;
    this.iv = iv;
    this.ev = ev;
  }
}

export class AbilityArr {
  constructor(abilities) {
    this.abilities = abilities;
  }
}

export class AbilityInfo {
  constructor(name, description, isHidden) {
    this.name = name;
    this.description = description;
    this.isHidden = isHidden;
  }
}

export class Move {
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