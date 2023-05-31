import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { calculateStatTotal, calculateHpTotal, getNatureModifier, natureModifiers } from '../../../lib/calcStats';

import { useSelector, useDispatch } from 'react-redux';
import pokeSlice from '../../../reduxStore/pokeSlice';

function Stat (props) {
  const [statTotal, setStatTotal] = useState(0);
  const [IV, setIV] = useState(props.stat.iv)
  const [EV, setEV] = useState(props.stat.ev)

  const pokeState = useSelector(state => state.pokemon);
  const teamState = useSelector(state => state.team);
  let dispatch = useDispatch();

  // getHpTotal and getStatTotal only exist to make the rest of the code easier to read
  const getHpTotal = () => {
    return calculateHpTotal(
      props.stat.base_stat,
      props.stat.iv,
      props.stat.ev,
      pokeState.pokemon.level,
    )
  }

  const getStatTotal = () => {
    return calculateStatTotal(
      props.stat.name,
      props.stat.base_stat,
      props.stat.iv,
      props.stat.ev,
      pokeState.pokemon.level,
      pokeState.pokemon.nature
    )
  }

  const calculateMaxStatTotal = () => {
    const natureMultiplier = getNatureModifier(natureModifiers, pokeState.pokemon.nature, props.stat.name);

    return Math.floor(((Math.floor(((2 * props.stat.base_stat + props.stat.iv + Math.floor(255 / 4)) * pokeState.pokemon.level) / 100)) + 5) * natureMultiplier)
  }

  const calculateMinStatTotal = () => {
    const natureMultiplier = getNatureModifier(natureModifiers, pokeState.pokemon.nature, props.stat.name);

    return Math.floor(((Math.floor(((2 * props.stat.base_stat + props.stat.iv + Math.floor(0 / 4)) * pokeState.pokemon.level) / 100)) + 5) * natureMultiplier)
  }

  const calculateMaxHpTotal = () => {
    return Math.floor(((2 * props.stat.base_stat + props.stat.iv + Math.floor(255 / 4)) * pokeState.pokemon.level) / 100) + pokeState.pokemon.level + 10
  }

  const calculateMinHpTotal = () => {
    return Math.floor(((2 * props.stat.base_stat + props.stat.iv + Math.floor(0 / 4)) * pokeState.pokemon.level) / 100) + pokeState.pokemon.level + 10
  }

  useEffect(() => {
    if (props.stat.name === 'HP') {
      setStatTotal(getHpTotal())
    } else if (props.stat.name !== 'HP') {
      setStatTotal(getStatTotal())
    }
  }, [])

    return(
      <Container 
        style={{textAlign: 'left', padding: '0', marginTop: '0'}} 
        key={`${props.stat.name}_container`}
      >
        {props.stat.name === 'HP' ?
          <>
            {props.stat.name} : {getHpTotal()} / {calculateMaxHpTotal()}
            <ProgressBar 
              style={{height: '0.5vh', width: '90%'}} 
              now={getHpTotal()} 
              max={calculateMaxHpTotal()} 
              min={calculateMinHpTotal()}
              key={`${props.stat.name}_${statTotal}`}
            />
          </>         
        :
          <>
          {props.stat.name} : {getStatTotal()} / {calculateMaxStatTotal()}
          <ProgressBar 
            style={{height: '0.5vh', width: '90%'}} 
            now={getStatTotal()} 
            max={calculateMaxStatTotal()} 
            min={calculateMinStatTotal()}
            key={`${props.stat.name}_${statTotal}`}
          />
          </>
        }
      </Container>
    )
}

export default Stat;