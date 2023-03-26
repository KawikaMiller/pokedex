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
      statName: this.props.stat.name,
      statTotal: 0,
      nature: 1, //change this later
      natureName: this.props.nature
    }

    // 
    this.boostNatures = [
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

  }

  getNatureMultiplier = () => {
    let nature = this.boostNatures.find(nature => nature.name.toLowerCase() === this.state.natureName.toLowerCase());
    let natureMultiplier = 1;

    // nature will be undefined if pokemon has a neutral nature (nature that does not buff/debuff any stat)
    if (nature) {
      if (nature.buff === this.state.statName) {
        natureMultiplier = 1.1;
      } else if (nature.debuff === this.state.statName) {
        natureMultiplier = 0.9;
      }      
    }

    return natureMultiplier;
  }

  calculateStatTotal = () => {
    const natureMultiplier = this.getNatureMultiplier()

    const statValue = Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(this.props.stat.ev / 4)) * this.props.level) / 100)) + 5) * natureMultiplier);

    return statValue;
  }

  calculateHpTotal = () => {

    const hpValue = Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(this.props.stat.ev / 4)) * this.props.level) / 100) + this.props.level + 10;

    return hpValue;
  }

  calculateMaxStatTotal = () => {
    const natureMultiplier = this.getNatureMultiplier()

    return Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(255 / 4)) * this.props.level) / 100)) + 5) * natureMultiplier)
  }

  calculateMinStatTotal = () => {
    const natureMultiplier = this.getNatureMultiplier()

    return Math.floor(((Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(0 / 4)) * this.props.level) / 100)) + 5) * natureMultiplier)
  }

  calculateMaxHpTotal = () => {
    return Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(255 / 4)) * this.props.level) / 100) + this.props.level + 10
  }

  calculateMinHpTotal = () => {
    return Math.floor(((2 * this.props.stat.base_stat + this.props.stat.iv + Math.floor(0 / 4)) * this.props.level) / 100) + this.props.level + 10
  }

  abbreviateStatName = () => {
    switch (this.props.stat.name) {
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
        natureName: this.props.nature
      })
    }
    else if(prevProps !== this.props && this.state.statName !== 'HP') {
      this.setState({
        level: this.props.level,
        IV: this.props.stat.iv,
        EV: this.props.stat.ev,
        statTotal: this.calculateStatTotal(),
        natureName: this.props.nature
      })
    }
  }

  componentDidMount() {
    this.abbreviateStatName();
  }

  render() {
    return(
      <Container 
        style={{textAlign: 'left', padding: '0', marginTop: '0'}} 
        key={`${this.state.statName}_container`}
      >
        {this.state.statName === 'HP' ?
        <>
          {this.state.statName} : {this.calculateHpTotal()} / {this.calculateMaxHpTotal()}
          <ProgressBar 
            style={{height: '0.5vh', width: '90%'}} 
            now={this.calculateHpTotal()} 
            max={this.calculateMaxHpTotal()} 
            min={this.calculateMinHpTotal()}
            key={`${this.state.statName}_${this.state.statTotal}`}
          />
        </>         
        :
        <>
        {this.state.statName} : {this.calculateStatTotal()} / {this.calculateMaxStatTotal()}
        <ProgressBar 
          style={{height: '0.5vh', width: '90%'}} 
          now={this.calculateStatTotal()} 
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