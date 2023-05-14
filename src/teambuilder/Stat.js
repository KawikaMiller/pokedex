import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { calculateStatTotal, calculateHpTotal, getNatureModifier, natureModifiers } from '../lib/calcStats';

function Stat (props) {
  const [IV, setIV] = useState(props.stat.iv);
  const [EV, setEV] = useState(props.stat.ev);
  const [level, setLevel] = useState(props.level);
  const [statName, setStatName] = useState(props.stat.name);
  const [statTotal, setStatTotal] = useState(0);
  const [nature, setNature] = useState(1); // change this later
  const [natureName, setNatureName] = useState(props.nature);

  // getHpTotal and getStatTotal only exist to make the rest of the code easier to read
  const getHpTotal = () => {
    return calculateHpTotal(
      props.stat.base_stat,
      props.stat.iv,
      props.stat.ev,
      props.level,
    )
  }

  const getStatTotal = () => {
    return calculateStatTotal(
      props.stat.name,
      props.stat.base_stat,
      props.stat.iv,
      props.stat.ev,
      props.level,
      props.nature
    )
  }

  const calculateMaxStatTotal = () => {
    const natureMultiplier = getNatureModifier(natureModifiers, props.nature, props.stat.name);

    return Math.floor(((Math.floor(((2 * props.stat.base_stat + props.stat.iv + Math.floor(255 / 4)) * props.level) / 100)) + 5) * natureMultiplier)
  }

  const calculateMinStatTotal = () => {
    const natureMultiplier = getNatureModifier(natureModifiers, props.nature, props.stat.name);

    return Math.floor(((Math.floor(((2 * props.stat.base_stat + props.stat.iv + Math.floor(0 / 4)) * props.level) / 100)) + 5) * natureMultiplier)
  }

  const calculateMaxHpTotal = () => {
    return Math.floor(((2 * props.stat.base_stat + props.stat.iv + Math.floor(255 / 4)) * props.level) / 100) + props.level + 10
  }

  const calculateMinHpTotal = () => {
    return Math.floor(((2 * props.stat.base_stat + props.stat.iv + Math.floor(0 / 4)) * props.level) / 100) + props.level + 10
  }

  const componentDidUpdate = (prevProps) => {
    if (prevProps !== props && statName === 'HP') {
      setLevel(props.level);
      setIV(props.stat.iv);
      setEV(props.stat.ev);
      setStatTotal(getHpTotal());
      setNatureName(props.nature);
    }
    else if(prevProps !== props && statName !== 'HP') {
      setLevel(props.level);
      setIV(props.stat.iv);
      setEV(props.stat.ev);
      setStatTotal(getStatTotal());
      setNatureName(props.nature);
    }
  }

  const componentDidMount = () => {
    if (props.stat.name === 'HP') {
      setStatTotal(getHpTotal())
    } else if (props.stat.name !== 'HP') {
      setStatTotal(getStatTotal())
    }
  }

    return(
      <Container 
        style={{textAlign: 'left', padding: '0', marginTop: '0'}} 
        key={`${statName}_container`}
      >
        {statName === 'HP' ?
        <>
          {statName} : {getHpTotal()} / {calculateMaxHpTotal()}
          <ProgressBar 
            style={{height: '0.5vh', width: '90%'}} 
            now={getHpTotal()} 
            max={calculateMaxHpTotal()} 
            min={calculateMinHpTotal()}
            key={`${statName}_${statTotal}`}
          />
        </>         
        :
        <>
        {statName} : {getStatTotal()} / {calculateMaxStatTotal()}
        <ProgressBar 
          style={{height: '0.5vh', width: '90%'}} 
          now={getStatTotal()} 
          max={calculateMaxStatTotal()} 
          min={calculateMinStatTotal()}
          key={`${statName}_${statTotal}`}
        />
        </>
        }
      </Container>
    )
}

export default Stat;