import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
// import Accordion from 'react-bootstrap/Accordion';
// import Button from 'react-bootstrap/Button';

import TypeChartRow from './TypeChartRow';

class TeamTypeChart extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      allTypes: [
        'Normal',
        'Fire',
        'Water',
        'Grass',
        'Electric',
        'Flying',
        'Bug',
        'Rock',
        'Ground',
        'Fighting',
        'Steel',
        'Poison',
        'Ice',
        'Dragon',
        'Ghost',
        'Psychic',
        'Dark',
        'Fairy'
      ]
    }
  }

  render() {
    return(
      this.props.team.length > 0 ? 
      <Container>
        <Table id='team_type_chart_table' striped bordered hover size='sm'>
          <thead key='type_chart_tablehead'>
            <tr key='type_chart_headers' id='type_chart_headers' style={{margin: '0.25rem'}}>
              <th></th>{/*intentionally blank*/}
              {this.state.allTypes.map(element => (
                <th key={`${element}_header`}>{element}</th>
              ))}
            </tr>
          </thead>

          <tbody key='type_chart_tablebody'>
            {this.props.team.map(element => (
              <TypeChartRow typeInfo={element.types} pokemonName={element.name}/>
            ))}
          </tbody>
        </Table>
      </Container> 
      : 
        null
    )
  }
}

export default TeamTypeChart;