import React from 'react';
// import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

class SideTabs extends React.Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render(){
    return(
      <Tabs defaultActiveKey='home' fill style={{width: '50%', position: 'relative', left: '50%', border: 'darkRed'}}>
        <Tab eventKey='home' title='Moves & Abilities'>

        </Tab>
        <Tab eventKey='team' title='Team Builder'>

        </Tab>
        <Tab eventKey='items' title='Items'>

        </Tab>
      </Tabs>
    )
  }
}

export default SideTabs;