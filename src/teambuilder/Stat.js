import React from 'react';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { calculateStatTotal, calculateHpTotal, getNatureModifier, natureModifiers } from '../lib/calcStats';

class Stat extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      IV: this.props.stat.iv,
      EV: this.props.stat.ev,
      level: this.props.level,
      statName: this.props.stat.name,
      statTotal: 0,
      nature: 1, //change this later
      natureName: this.props.nature
    }
  }

  // getHpTotal and getStatTotal only exist to make the rest of the code easier to read
  getHpTotal = () => {
    return calculateHpTotal(
      this.props.stat.base_stat,
      this.props.stat.iv,
      this.props.stat.ev,
      this.props.level,
    )
  }

  getStatTotal = () => {
    return calculateStatTotal(
      this.props.stat.name,
      this.props.stat.base_stat,
      this.props.stat.iv,
      this.props.stat.ev,
      this.props.level,
      this.props.nature
    )
  }

  calculateMaxStatTotal = () => {
    const natureMultiplier = getNatureModifier(natureModifiers, this.props.nature, this.props.stat.name);

    return Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(255 / 4)) * this.props.level) / 100)) + 5) * natureMultiplier)
  }

  calculateMinStatTotal = () => {
    const natureMultiplier = getNatureModifier(natureModifiers, this.props.nature, this.props.stat.name);

    return Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(0 / 4)) * this.props.level) / 100)) + 5) * natureMultiplier)
  }

  calculateMaxHpTotal = () => {
    return Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(255 / 4)) * this.props.level) / 100) + this.props.level + 10
  }

  calculateMinHpTotal = () => {
    return Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(0 / 4)) * this.props.level) / 100) + this.props.level + 10
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.state.statName === 'HP') {
      this.setState({
        level: this.props.level,
        IV: this.props.stat.iv,
        EV: this.props.stat.ev,
        statTotal: this.getHpTotal(),
        natureName: this.props.nature
      })
    }
    else if(prevProps !== this.props && this.state.statName !== 'HP') {
      this.setState({
        level: this.props.level,
        IV: this.props.stat.iv,
        EV: this.props.stat.ev,
        statTotal: this.getStatTotal(),
        natureName: this.props.nature
      })
    }
  }

  componentDidMount() {
    if (this.props.stat.name === 'HP') {
      this.setState({
        statTotal: this.getHpTotal()
      })
    } else if (this.props.stat.name !== 'HP') {
      this.setState({
        statTotal: this.getStatTotal()
      })
    }
  }

  render() {
    return(
      <Container 
        style={{textAlign: 'left', padding: '0', marginTop: '0'}} 
        key={`${this.state.statName}_container`}
      >
        {this.state.statName === 'HP' ?
        <>
          {this.state.statName} : {this.getHpTotal()} / {this.calculateMaxHpTotal()}
          <ProgressBar 
            style={{height: '0.5vh', width: '90%'}} 
            now={this.getHpTotal()} 
            max={this.calculateMaxHpTotal()} 
            min={this.calculateMinHpTotal()}
            key={`${this.state.statName}_${this.state.statTotal}`}
          />
        </>         
        :
        <>
        {this.state.statName} : {this.getStatTotal()} / {this.calculateMaxStatTotal()}
        <ProgressBar 
          style={{height: '0.5vh', width: '90%'}} 
          now={this.getStatTotal()} 
          max={this.calculateMaxStatTotal()} 
          min={this.calculateMinStatTotal()}
          key={`${this.state.statName}_${this.state.statTotal}`}
        />
        </>
        }
      </Container>
    )
  }
}

export default Stat;