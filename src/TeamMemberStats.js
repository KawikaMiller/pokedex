import React from 'react';
import Stat from './Stat';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

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

  handleEditStats = () => {
    this.handleHideModal();
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
            onClick={this.handleEditStats}
            >Edit
          </Button>
        </div>
      </div>

      <Modal show={this.state.showModal} onHide={this.handleHideModal}>
        <Modal.Header>Edit IVs & EVs</Modal.Header>
        <Modal.Body>
          <Form>
            <div style={{display: 'flex', margin: '0.5rem'}}>
              <p style={{width: '30%'}}>HP</p>
              <Form.Control type="number" ></Form.Control>
              <Form.Control type="number" ></Form.Control>
            </div>
            <div style={{display: 'flex', margin: '0.5rem'}}>
              <p style={{width: '30%'}}>ATK</p>
              <Form.Control type="number" ></Form.Control>
              <Form.Control type="number" ></Form.Control>
            </div>
            <div style={{display: 'flex', margin: '0.5rem'}}>
              <p style={{width: '30%'}}>DEF</p>
              <Form.Control type="number" ></Form.Control>
              <Form.Control type="number" ></Form.Control>
            </div>
            <div style={{display: 'flex', margin: '0.5rem'}}>
              <p style={{width: '30%'}}>SP.ATK</p>
              <Form.Control type="number" ></Form.Control>
              <Form.Control type="number" ></Form.Control>
            </div>
            <div style={{display: 'flex', margin: '0.5rem'}}>
              <p style={{width: '30%'}}>SP.DEF</p>
              <Form.Control type="number" ></Form.Control>
              <Form.Control type="number" ></Form.Control>
            </div>
            <div style={{display: 'flex', margin: '0.5rem'}}>
              <p style={{width: '30%'}}>SPD</p>
              <Form.Control type="number" ></Form.Control>
              <Form.Control type="number" ></Form.Control>
            </div>
            
          </Form>
        </Modal.Body>
      </Modal>
    </>
    )
  }
}

export default TeamMemberStats;