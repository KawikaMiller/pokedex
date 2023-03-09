import React from "react";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import MoveContainer from "./MoveContainer";
import Container from 'react-bootstrap/Container';
import Abilities from "./Abilities";
import Team from "./Team";

class RightCard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      activeKey: 0,
    }
  }

  changeTab(tabIndex) {
    this.setState({
      activeKey: tabIndex
    })
  }

  componentDidMount() {
    console.log('reRender successful')
  }

  render() {
    return(
      <Card bg='danger' style={{justifyContent: 'space-evenly'}}>    
      
      <Card.Header>
        <Nav variant='tabs' defaultActiveKey='0'>
          <Nav.Item>
            <Nav.Link eventKey='0' onClick={() => {this.changeTab(0)}}>Moves & Abilities</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='1' onClick={() => {this.changeTab(1)}}>Team Builder</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header> 
      
      <Card.Body id="right_card_body" style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center'}}>
        {this.state.activeKey === 0 ?
        <>
          <Container style={{maxHeight: '57vh', overflowY: 'hidden'}}>
          {this.props.searchResult ?
            <MoveContainer moves={this.props.searchResult.moves} pokemonName={this.props.searchResult.name} key={`${this.props.searchResult.name}_moves`}/> 
            : null }
          </Container>

          <Container id='abilities_container'>
            {this.props.searchResult ? 
              <Abilities abilities={this.props.searchResult.abilities} />
              : null  
            }
          </Container>
        </> : null}

        {this.state.activeKey === 1 ?
        <Container>
          <Team searchResult={this.props.searchResult}/>
        </Container> 
        
        : null}

      </Card.Body>


    </Card>
    )
  }
}

export default RightCard;