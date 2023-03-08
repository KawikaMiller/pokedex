import React from 'react';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Stat extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      IV: 31,
      EV: 0,
      level: 99,
      statName: undefined,
      statValue: 0,
      nature: 1, //change this later
    }
  }

  calculateStatValue = () => {
    return Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(this.props.stat.ev / 4)) * this.state.level) / 100)) + 5) * this.state.nature)
  }

  calculateHpValue = () => {
    return Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(this.props.stat.ev / 4)) * this.state.level) / 100) + this.state.level + 10
  }

  calculateMaxStatValue = () => {
    return Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(255 / 4)) * this.state.level) / 100)) + 5) * this.state.nature)
  }

  calculateMinStatValue = () => {
    return Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(0 / 4)) * this.state.level) / 100)) + 5) * this.state.nature)
  }

  calculateMaxHpValue = () => {
    return Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(255 / 4)) * this.state.level) / 100) + this.state.level + 10
  }

  calculateMinHpValue = () => {
    return Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(0 / 4)) * this.state.level) / 100) + this.state.level + 10
  }

  abbreviateStatName = () => {
    switch (this.props.stat.stat.name) {
      case 'hp' :
        this.setState({
          statName: 'HP',
          statValue: this.calculateHpValue()
        });
        break;
      case 'attack' :
        this.setState({
          statName: 'ATK',
          statValue: this.calculateStatValue(),
        });
        break;
      case 'defense' :
        this.setState({
          statName: 'DEF',
          statValue: this.calculateStatValue(),
        });
        break;
      case 'special-attack' :
        this.setState({
          statName: 'SP.ATK',
          statValue: this.calculateStatValue(),
        });
        break;
      case 'special-defense' :
        this.setState({
          statName: 'SP.DEF',
          statValue: this.calculateStatValue(),
        });
        break;
      case 'speed' :
        this.setState({
          statName: 'SPD',
          statValue: this.calculateStatValue()
        });
        break;
      default:
        console.log('no stat name match found')
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps !== this.props) {
      this.setState({
      IV: this.props.stat.iv,
      EV: this.props.stat.ev
    })

    if (this.state.statName === 'HP') {
      this.setState({
        statValue: this.calculateHpValue()
      })
    } else {
      this.setState({
        statValue: this.calculateStatValue()
      })
    } 
    }

  }

  componentDidMount() {
    // hp gets calculated differently than other stats
    this.abbreviateStatName();

    this.setState({
      IV: this.props.stat.iv,
      EV: this.props.stat.ev
    })
  }

  render() {
    return(
      <Container 
        style={{textAlign: 'left', padding: '0'}} 
        key={`${this.state.statName}_container`}
      >
        {this.state.statName === 'HP' ?
        <>
          {this.state.statName} : {this.state.statValue} 
          <ProgressBar 
            style={{height: '0.5vh', width: '90%'}} 
            now={this.state.statValue} 
            max={this.calculateMaxHpValue()} 
            min={this.calculateMinHpValue()}
            key={`${this.state.statName}_${this.state.statValue}`}
          />
        </>         
        :
        <>
        {this.state.statName} : {this.state.statValue} 
        <ProgressBar 
          style={{height: '0.5vh', width: '90%'}} 
          now={this.state.statValue} 
          max={this.calculateMaxStatValue()} 
          min={this.calculateMinStatValue()}
          key={`${this.state.statName}_${this.state.statValue}`}
        />
        </>
}

        <></>
      </Container>
    )
  }
}

export default Stat;