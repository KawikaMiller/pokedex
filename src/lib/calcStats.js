'use strict';

export const calculateStatTotal = (baseStat, iv, ev, level, nature) => {
  return Math.floor(((Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100)) + 5) * nature)
}

export const calculateHpTotal = (baseStat, iv, ev, level) => {
  return Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + level + 10
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