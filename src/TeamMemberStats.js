import React from 'react';
import Stat from './Stat';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class TeamMemberStats extends React.Component{
  constructor(props){
    super(props);

    // initial stats in props do not have IV or EV property/values, creating the properties and assigning default values
    let newStats = this.props.stats;
    newStats.forEach(element => {
      element.iv = 31;
      element.ev = 0;
    })

    this.state = {
      stats: newStats,
      showModal: false,
      disableSubmit: false,
    }
  }

  // prevents EVs from totaling over 510
  handleFormChange = (event) => {
    if (
      parseInt(event.target.form[1].value) +
      parseInt(event.target.form[3].value) +
      parseInt(event.target.form[5].value) +
      parseInt(event.target.form[7].value )+
      parseInt(event.target.form[9].value) +
      parseInt(event.target.form[11].value) > 510 ) {
        this.setState({
          disableSubmit: true
        })
      } else {
        this.setState({
          disableSubmit: false
        })
      }
  }

  // toggles visibility of edit stats modal
  handleHideModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  // gets form information and updates stats in this component and parent component
  handleEditStats = (event) => {
    event.preventDefault();

    let newStats = this.state.stats;

    newStats[0].iv = parseInt(event.target.iv_hp.value)
    newStats[0].ev = parseInt(event.target.ev_hp.value)

    newStats[1].iv = parseInt(event.target.iv_atk.value)
    newStats[1].ev = parseInt(event.target.ev_atk.value)

    newStats[2].iv = parseInt(event.target.iv_def.value)
    newStats[2].ev = parseInt(event.target.ev_def.value)

    newStats[3].iv = parseInt(event.target.iv_spatk.value)
    newStats[3].ev = parseInt(event.target.ev_spatk.value)

    newStats[4].iv = parseInt(event.target.iv_spdef.value)
    newStats[4].ev = parseInt(event.target.ev_spdef.value)

    newStats[5].iv = parseInt(event.target.iv_spd.value)
    newStats[5].ev = parseInt(event.target.ev_spd.value)
    // sends updated stat values back to placeholder component
    this.props.updateStatValues(newStats);

    this.setState({
      stats: newStats
    })
  
    this.handleHideModal();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      return true;
    }
  }

  render() {
    return(
      <>
      <div className='team_member_stats' >
        <div className='stats_sub_phys'>
          <Stat stat={this.state.stats[0]}/>
          <Stat stat={this.state.stats[1]}/>
          <Stat stat={this.state.stats[2]}/>
        </div>
        <div className='stats_sub_spec'>
          <Stat stat={this.state.stats[3]}/>
          <Stat stat={this.state.stats[4]}/>
          <Stat stat={this.state.stats[5]}/>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: "flex-end"}}>
          <Button 
            style={{ margin: '0.5rem 0', padding: '0'}}
            onClick={this.handleHideModal}
            >Edit
          </Button>
        </div>
      </div>

      {/* handles editing stat IV and EV values */}
      <Modal show={this.state.showModal} onHide={this.handleHideModal} centered>
        <Modal.Header>Edit IVs & EVs <span>EV totals must be 510 or less</span></Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleEditStats} onChange={this.handleFormChange}>  
            <Container id='team_member_stats_edit'>
              <div>
                <Form.Group className='ivev_form'>
                  <Form.Label>HP</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_hp' 
                    placeholder={this.state.stats[0].iv ? this.state.stats[0].iv : 'IVs'}
                    defaultValue={this.state.stats[0].iv ? this.state.stats[0].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_hp' 
                    placeholder={this.state.stats[0].ev ? this.state.stats[0].ev : 'EVs'}
                    defaultValue={this.state.stats[0].ev ? this.state.stats[0].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                <Form.Group className='ivev_form'>
                  <Form.Label>ATK</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_atk' 
                    placeholder={this.state.stats[1].iv ? this.state.stats[1].iv : 'IVs'}
                    defaultValue={this.state.stats[1].iv ? this.state.stats[1].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_atk' 
                    placeholder={this.state.stats[1].ev ? this.state.stats[1].ev : 'EVs'}
                    defaultValue={this.state.stats[1].ev ? this.state.stats[1].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                <Form.Group className='ivev_form'>
                  <Form.Label>DEF</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_def' 
                    placeholder={this.state.stats[2].iv ? this.state.stats[2].iv : 'IVs'}
                    defaultValue={this.state.stats[2].iv ? this.state.stats[2].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_def' 
                    placeholder={this.state.stats[2].ev ? this.state.stats[2].ev : 'EVs'}
                    defaultValue={this.state.stats[2].ev ? this.state.stats[2].ev : 0}  
                    min='0' max='255' ></Form.Control>
                </Form.Group>
              </div>
              <div>
                <Form.Group className='ivev_form'>
                  <Form.Label>SPATK</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_spatk' 
                    placeholder={this.state.stats[3].iv ? this.state.stats[3].iv : 'IVs'}
                    defaultValue={this.state.stats[3].iv ? this.state.stats[3].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spatk' 
                    placeholder={this.state.stats[3].ev ? this.state.stats[3].ev : 'EVs'}
                    defaultValue={this.state.stats[3].ev ? this.state.stats[3].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                <Form.Group className='ivev_form'>
                  <Form.Label>SPDEF</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_spdef' 
                    placeholder={this.state.stats[4].iv ? this.state.stats[4].iv : 'IVs'}
                    defaultValue={this.state.stats[4].iv ? this.state.stats[4].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spdef' 
                    placeholder={this.state.stats[4].ev ? this.state.stats[4].ev : 'EVs'}
                    defaultValue={this.state.stats[4].ev ? this.state.stats[4].ev : 0} 
                    min='0' max='255'></Form.Control>
                </Form.Group>

                <Form.Group className='ivev_form'>
                  <Form.Label>SPD</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_spd' 
                    placeholder={this.state.stats[5].iv ? this.state.stats[5].iv : 'IVs'}
                    defaultValue={this.state.stats[5].iv ? this.state.stats[5].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spd' 
                    placeholder={this.state.stats[5].ev ? this.state.stats[5].ev : 'EVs'}
                    defaultValue={this.state.stats[5].ev ? this.state.stats[5].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>
              </div>
            </Container>
            <Button type='submit' disabled={this.state.disableSubmit}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
    )
  }
}

export default TeamMemberStats;