import React from 'react';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Stat extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      IV: this.props.stat.iv,
      EV: this.props.stat.ev,
      level: this.props.level,
      statName: this.props.stat.stat.name,
      statTotal: 0,
      nature: 1, //change this later
    }
  }

  calculateStatTotal = () => {
    return Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(this.props.stat.ev / 4)) * this.props.level) / 100)) + 5) * this.state.nature)
  }

  calculateHpTotal = () => {
    return Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(this.props.stat.ev / 4)) * this.props.level) / 100) + this.props.level + 10
  }

  calculateMaxStatTotal = () => {
    return Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(255 / 4)) * this.props.level) / 100)) + 5) * this.state.nature)
  }

  calculateMinStatTotal = () => {
    return Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(0 / 4)) * this.props.level) / 100)) + 5) * this.state.nature)
  }

  calculateMaxHpTotal = () => {
    return Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(255 / 4)) * this.props.level) / 100) + this.props.level + 10
  }

  calculateMinHpTotal = () => {
    return Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(0 / 4)) * this.props.level) / 100) + this.props.level + 10
  }

  abbreviateStatName = () => {
    switch (this.props.stat.stat.name) {
      case 'hp' :
        this.setState({
          statName: 'HP',
          statTotal: this.calculateHpTotal()
        });
        break;
      case 'attack' :
        this.setState({
          statName: 'ATK',
          statTotal: this.calculateStatTotal(),
        });
        break;
      case 'defense' :
        this.setState({
          statName: 'DEF',
          statTotal: this.calculateStatTotal(),
        });
        break;
      case 'special-attack' :
        this.setState({
          statName: 'SP.ATK',
          statTotal: this.calculateStatTotal(),
        });
        break;
      case 'special-defense' :
        this.setState({
          statName: 'SP.DEF',
          statTotal: this.calculateStatTotal(),
        });
        break;
      case 'speed' :
        this.setState({
          statName: 'SPD',
          statTotal: this.calculateStatTotal()
        });
        break;
      default:
        console.log('no stat name match found')
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps !== this.props && this.state.statName === 'HP') {
      this.setState({
        level: this.props.level,
        IV: this.props.stat.iv,
        EV: this.props.stat.ev,
        statTotal: this.calculateHpTotal(),
      })
    }
    else if(prevProps !== this.props && this.state.statName !== 'HP') {
      this.setState({
        level: this.props.level,
        IV: this.props.stat.iv,
        EV: this.props.stat.ev,
        statTotal: this.calculateStatTotal(),
      })
    }
  }

  componentDidMount() {
    this.abbreviateStatName();
  }

  render() {
    return(
      <Container 
        style={{textAlign: 'left', padding: '0'}} 
        key={`${this.state.statName}_container`}
      >
        {this.state.statName === 'HP' ?
        <>
          {this.state.statName} : {this.state.statTotal} / {this.calculateMaxHpTotal()}
          <ProgressBar 
            style={{height: '0.5vh', width: '90%'}} 
            now={this.state.statTotal} 
            max={this.calculateMaxHpTotal()} 
            min={this.calculateMinHpTotal()}
            key={`${this.state.statName}_${this.state.statTotal}`}
          />
        </>         
        :
        <>
        {this.state.statName} : {this.state.statTotal} / {this.calculateMaxStatTotal()}
        <ProgressBar 
          style={{height: '0.5vh', width: '90%'}} 
          now={this.state.statTotal} 
          max={this.calculateMaxStatTotal()} 
          min={this.calculateMinStatTotal()}
          key={`${this.state.statName}_${this.state.statTotal}`}
        />
        </>
}

        <></>
      </Container>
    )
  }
}

export default Stat;