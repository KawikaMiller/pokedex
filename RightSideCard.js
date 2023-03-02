import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

class UncontrolledExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
      >
      <Tab eventKey="home" title="Home">

      </Tab>
      <Tab eventKey="profile" title="Profile">

      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>

      </Tab>
    </Tabs>
    )
  }


  // return (

  // );
}

export default UncontrolledExample;