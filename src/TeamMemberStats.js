import React from 'react';
import Stat from './Stat';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class TeamMemberStats extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      stats: this.props.stats,
      showModal: false,
    }
  }

  handleHideModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleEditStatsModal = () => {
    this.handleHideModal();
  }

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

  handleChangeValue = (event, statIdx, ivev) => {

  }


  render() {
    return(
      <>
      <div className='team_member_stats' >
        <div className='stats_sub_phys'>
          <Stat stat={this.props.stats[0]}/>
          <Stat stat={this.props.stats[1]} key='atk_statbar'/>
          <Stat stat={this.props.stats[2]}/>
        </div>
        <div className='stats_sub_spec'>
          <Stat stat={this.props.stats[3]}/>
          <Stat stat={this.props.stats[4]}/>
          <Stat stat={this.props.stats[5]}/>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: "flex-end"}}>
          <Button 
            style={{ margin: '0.5rem 0', padding: '0'}}
            onClick={this.handleEditStatsModal}
            >Edit
          </Button>
        </div>
      </div>

      <Modal show={this.state.showModal} onHide={this.handleHideModal} centered>
        <Modal.Header>Edit IVs & EVs</Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleEditStats}>  
            <Container id='team_member_stats_edit'>
              <div>
                <Form.Group className='ivev_form'>
                  <Form.Label>HP</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_hp' 
                    placeholder={this.state.stats[0].iv ? this.state.stats[0].iv : 'IVs'}
                    defaultValue={this.state.stats[0].iv ? this.state.stats[0].iv : undefined} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_hp' 
                    placeholder={this.state.stats[0].ev ? this.state.stats[0].ev : 'EVs'}
                    defaultValue={this.state.stats[0].ev ? this.state.stats[0].ev : undefined} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                <Form.Group className='ivev_form'>
                  <Form.Label>ATK</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_atk' 
                    placeholder={this.state.stats[1].iv ? this.state.stats[1].iv : 'IVs'}
                    defaultValue={this.state.stats[1].iv ? this.state.stats[1].iv : undefined} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_atk' 
                    placeholder={this.state.stats[1].ev ? this.state.stats[1].ev : 'EVs'}
                    defaultValue={this.state.stats[1].ev ? this.state.stats[1].ev : undefined} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                <Form.Group className='ivev_form'>
                  <Form.Label>DEF</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_def' 
                    placeholder={this.state.stats[2].iv ? this.state.stats[2].iv : 'IVs'}
                    defaultValue={this.state.stats[2].iv ? this.state.stats[2].iv : undefined} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_def' 
                    placeholder={this.state.stats[2].ev ? this.state.stats[2].ev : 'EVs'}
                    defaultValue={this.state.stats[2].ev ? this.state.stats[2].ev : undefined}  
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
                    defaultValue={this.state.stats[3].iv ? this.state.stats[3].iv : undefined} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spatk' 
                    placeholder={this.state.stats[3].ev ? this.state.stats[3].ev : 'EVs'}
                    defaultValue={this.state.stats[3].ev ? this.state.stats[3].ev : undefined} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                <Form.Group className='ivev_form'>
                  <Form.Label>SPDEF</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_spdef' 
                    placeholder={this.state.stats[4].iv ? this.state.stats[4].iv : 'IVs'}
                    defaultValue={this.state.stats[4].iv ? this.state.stats[4].iv : undefined} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spdef' 
                    placeholder={this.state.stats[4].ev ? this.state.stats[4].ev : 'EVs'}
                    defaultValue={this.state.stats[4].ev ? this.state.stats[4].ev : undefined} 
                    min='0' max='255'></Form.Control>
                </Form.Group>

                <Form.Group className='ivev_form'>
                  <Form.Label>SPD</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_spd' 
                    placeholder={this.state.stats[5].iv ? this.state.stats[5].iv : 'IVs'}
                    defaultValue={this.state.stats[5].iv ? this.state.stats[5].iv : undefined} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spd' 
                    placeholder={this.state.stats[5].ev ? this.state.stats[5].ev : 'EVs'}
                    defaultValue={this.state.stats[5].ev ? this.state.stats[5].ev : undefined} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>
              </div>
            </Container>
            <Button type='submit'>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
    )
  }
}

export default TeamMemberStats;