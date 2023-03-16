import React from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
// import Accordion from 'react-bootstrap/Accordion';
// import Button from 'react-bootstrap/Button';

class TeamTypeChart extends React.Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }

  render() {
    return(
      this.props.team.length > 0 ? 
      <Container style={{overflowX: 'scroll', margin: '0', padding: '0'}}>
        <Table id='team_type_chart_table' striped bordered hover size='sm' variant='dark'>
          <tr id='type_chart_headers' style={{margin: '0.25rem'}}>
            <th></th> {/*intentionally blank*/}
            <th>Normal</th>
            <th>Fire</th>
            <th>Water</th>
            <th>Grass</th>
            <th>Electric</th>
            <th>Flying</th>
            <th>Bug</th>
            <th>Rock</th>
            <th>Ground</th>
            <th>Fighting</th>
            <th>Steel</th>
            <th>Ghost</th>
            <th>Poison</th>
            <th>Ice</th>
            <th>Dragon</th>
            <th>Psychic</th>
            <th>Dark</th>
            <th>Fairy</th>
          </tr>
          {this.props.team.map(element => (
            <tr>
              <td>{element.name}</td>
              <td class='normal'>1×</td>
              <td class='fire'>1×</td>
              <td class='water'>1×</td>
              <td class='grass'>1×</td>
              <td class='electric'>1×</td>
              <td class='flying'>1×</td>
              <td class='bug'>1×</td>
              <td class='rock'>1×</td>
              <td class='ground'>1×</td>
              <td class='fighting'>1×</td>
              <td class='steel'>1×</td>
              <td class='ghost'>1×</td>
              <td class='poison'>1×</td>
              <td class='ice'>1×</td>
              <td class='dragon'>1×</td>
              <td class='psychic'>1×</td>
              <td class='dark'>1×</td>
              <td class='fairy'>1×</td>
            </tr>
          ))}
        </Table>
      </Container> 
      : 
        null
    )
  }
}

export default TeamTypeChart;