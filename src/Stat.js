import React from 'react';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Stat extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      IV: this.props.stat.iv,
      EV: this.props.stat.ev,
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

  abbreviateStatName = () => {
    switch (this.props.stat.stat.name) {
      case 'hp' :
        this.setState({
          statName: 'HP'
        });
        break;
      case 'attack' :
        this.setState({
          statName: 'ATK'
        });
        break;
      case 'defense' :
        this.setState({
          statName: 'DEF'
        });
        break;
      case 'special-attack' :
        this.setState({
          statName: 'SP.ATK'
        });
        break;
      case 'special-defense' :
        this.setState({
          statName: 'SP.DEF'
        });
        break;
      case 'speed' :
        this.setState({
          statName: 'SPD'
        });
        break;
    }
  }

  componentDidMount() {
    // hp gets calculated differently than other stats
    this.abbreviateStatName();

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

  render() {
    return(
      <Container style={{textAlign: 'left', padding: '0'}} key={`${this.state.statName}_container`}>
        {this.state.statName} : {this.state.statValue} <ProgressBar style={{height: '0.5vh', width: '90%'}} now={this.state.statValue} max={this.calculateMaxStatValue()} min={this.calculateMinStatValue()} />
      </Container>
    )
  }
}

export default Stat;