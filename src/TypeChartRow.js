import React from 'react'

class TypeChartRow extends React.Component{
  constructor(props){
    super(props);

    this.typeEffectiveness = [
      {
        type: 'normal',
        effectiveness: 1
      },
      {
        type: 'fire',
        effectiveness: 1
      },
      {
        type: 'water',
        effectiveness: 1
      },
      {
        type: 'grass',
        effectiveness: 1
      },
      {
        type: 'electric',
        effectiveness: 1
      },
      {
        type: 'flying',
        effectiveness: 1
      },
      {
        type: 'bug',
        effectiveness: 1
      },
      {
        type: 'rock',
        effectiveness: 1
      },
      {
        type: 'ground',
        effectiveness: 1
      },
      {
        type: 'fighting',
        effectiveness: 1
      },
      {
        type: 'steel',
        effectiveness: 1
      },
      {
        type: 'poison',
        effectiveness: 1
      },
      {
        type: 'ice',
        effectiveness: 1
      },
      {
        type: 'dragon',
        effectiveness: 1
      },
      {
        type: 'ghost',
        effectiveness: 1
      },
      {
        type: 'psychic',
        effectiveness: 1
      },
      {
        type: 'dark',
        effectiveness: 1
      },
      {
        type: 'fairy',
        effectiveness: 1
      },
    ]

    this.determineTypeEffectiveness();

    this.state = {
    }
  }

  determineTypeEffectiveness = () => {

    this.props.typeInfo.forEach(element => {
      element.doubleDamageFrom.forEach(item => {
        this.typeEffectiveness.forEach(thing => {
          if (thing.type.toLowerCase() === item.toLowerCase()) {
            thing.effectiveness *= 2;
          }
        })
      })
    })

    this.props.typeInfo.forEach(element => {
      element.halfDamageFrom.forEach(item => {
        this.typeEffectiveness.forEach(thing => {
          if(thing.type.toLowerCase() === item.toLowerCase()) {
            thing.effectiveness /= 2;
          }
        })
      })
    })

    this.props.typeInfo.forEach(element => {
      element.noDamageFrom.forEach(item => {
        this.typeEffectiveness.forEach(thing => {
          if(thing.type.toLowerCase() === item.toLowerCase()) {
            thing.effectiveness = 0;
          }
        })
      })
    })
  }

  componentDidMount() {
    this.setState({
      typeEffectiveness: this.typeEffectiveness
    })
  }

  render(){
    return(
      <tr key={`${this.props.typeInfo.name}_typechart_row`}>
        <td key={`${this.props.typeInfo.name}_label`}>
          <strong>
            {`${this.props.pokemonName[0].toUpperCase()}${this.props.pokemonName.slice(1).toLowerCase()}`}
          </strong>
        </td>
        {
          this.state.typeEffectiveness ? 
            this.state.typeEffectiveness.map(element => (
              <td>{`${element.effectiveness}x`}</td>
            )) 
          : 
            null 
        }
      </tr>
    )
  }
}

export default TypeChartRow