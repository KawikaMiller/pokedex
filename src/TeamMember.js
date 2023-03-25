import React from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class TeamMember extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      pokemon: this.props.pokemon,
      showMovesModal: false,
      showIvEvModal: false,
      showNicknameModal: false,
      disableSubmit: false,
    }

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

  getNatureMultiplier = (natureName) => {
    let nature = this.boostNatures.find(nature => nature.name.toLowerCase() === natureName.toLowerCase());
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

  calculateStatTotal = (statIdx, iv, ev, lvl, nature) => {
    const natureMultiplier = this.getNatureMultiplier(nature)

    const statValue = Math.floor(((Math.floor(((2 * this.state.pokemon.stats[statIdx].base_stat + iv + Math.floor(ev / 4)) * lvl) / 100)) + 5) * natureMultiplier);

    return statValue;
  }

  calculateHpTotal = (statIdx, iv, ev, lvl) => {

    const hpValue = Math.floor(((2 * this.state.pokemon.stats[statIdx].base_stat + iv + Math.floor(ev / 4)) * lvl) / 100) + lvl + 10;

    return hpValue;
  }

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

  handleToggleMovesModal = () => {
    this.setState({
      showMovesModal: !this.state.showMovesModal
    })
  }
  
  handleToggleIvEvModal = () => {
    this.setState({
      showIvEvModal: !this.state.showIvEvModal
    })
  }

  handleToggleNicknameModal = () => {
    this.setState({
      showNicknameModal: !this.state.showNicknameModal
    })
  }

  handleSubmitBattleInfo = (event) => {
    event.preventDefault();

    let newPokemon = this.state.pokemon;

    console.log(event.target)

    newPokemon.battleMoves = [event.target.move_1.value, event.target.move_2.value, event.target.move_3.value, event.target.move_4.value];

    newPokemon.battleAbility = event.target.battle_ability.value;

    newPokemon.heldItem = event.target.held_item.value;

    this.setState({
      pokemon: newPokemon
    })

    this.handleToggleMovesModal();
  }

  handleSubmitIvEvInfo = (event) => {
    event.preventDefault();

    let newPokemon = this.state.pokemon;

    newPokemon.stats[0].iv = parseInt(event.target.iv_hp.value)
    newPokemon.stats[0].ev = parseInt(event.target.ev_hp.value)
    newPokemon.stats[0].stat_value = this.calculateHpTotal(0, parseInt(event.target.iv_hp.value), parseInt(event.target.ev_hp.value), parseInt(event.target.level.value) )

    newPokemon.stats[1].iv = parseInt(event.target.iv_atk.value)
    newPokemon.stats[1].ev = parseInt(event.target.ev_atk.value)
    newPokemon.stats[1].stat_value = this.calculateStatTotal(1, parseInt(event.target.iv_atk.value), parseInt(event.target.ev_atk.value), parseInt(event.target.level.value), event.target.nature.value)

    newPokemon.stats[2].iv = parseInt(event.target.iv_def.value)
    newPokemon.stats[2].ev = parseInt(event.target.ev_def.value)
    newPokemon.stats[2].stat_value = this.calculateStatTotal(2, parseInt(event.target.iv_def.value), parseInt(event.target.ev_def.value), parseInt(event.target.level.value), event.target.nature.value)

    newPokemon.stats[3].iv = parseInt(event.target.iv_spatk.value)
    newPokemon.stats[3].ev = parseInt(event.target.ev_spatk.value)
    newPokemon.stats[3].stat_value = this.calculateStatTotal(3, parseInt(event.target.iv_spatk.value), parseInt(event.target.ev_spatk.value), parseInt(event.target.level.value), event.target.nature.value)

    newPokemon.stats[4].iv = parseInt(event.target.iv_spdef.value)
    newPokemon.stats[4].ev = parseInt(event.target.ev_spdef.value)
    newPokemon.stats[4].stat_value = this.calculateStatTotal(4, parseInt(event.target.iv_spdef.value), parseInt(event.target.ev_spdef.value), parseInt(event.target.level.value), event.target.nature.value)

    newPokemon.stats[5].iv = parseInt(event.target.iv_spd.value)
    newPokemon.stats[5].ev = parseInt(event.target.ev_spd.value)
    newPokemon.stats[5].stat_value = this.calculateStatTotal(5, parseInt(event.target.iv_spd.value), parseInt(event.target.ev_spd.value), parseInt(event.target.level.value), event.target.nature.value)

    newPokemon.level = parseInt(event.target.level.value)
    newPokemon.nature = event.target.nature.value

    this.setState({
      pokemon: newPokemon
    })

    this.handleToggleIvEvModal();
  }

  handleSubmitNickname = (event) => {
    event.preventDefault()

    let newPokemon = this.state.pokemon;

    newPokemon.nickname = event.target.pokemon_nickname.value

    this.setState({
      pokemon: newPokemon
    })

    this.handleToggleNicknameModal()
  }



  render(){
    return(
      <>
      <Card 
        className={
          `team_member ${this.props.pokemon.types.length === 2 ? `${this.props.pokemon.types[0].type.name} ${this.props.pokemon.types[1].type.name}` : this.props.pokemon.types[0].type.name}`
        }
        style={{
          background: this.props.pokemon.types.length === 2 ?
            `linear-gradient(
              var(--${this.props.pokemon.types[0].type.name}), var(--${this.props.pokemon.types[1].type.name})
            )` 
          : 
            `var(--${this.props.pokemon.types[0].type.name})`,
        }}
      >

        <Card.Header className='team_member_header'>
            <h6>{
              this.state.pokemon.nickname ? 
              this.state.pokemon.nickname
              :
              (this.props.pokemon.name[0].toUpperCase() + this.props.pokemon.name.slice(1))
              }</h6>
            {this.props.pokemon.types.map(element => <p>{element.type.name}</p>)}
        </Card.Header>

        <Card.Body className='team_member_body'>
          {/* shows sprite and level */}
          <section className='team_member_sprite'>
              <Card.Img 
                variant='top' 
                src={this.props.pokemon.sprite.front_default}
                style={{backgroundColor: 'white', borderRadius: '50%'}}
              >
              </Card.Img>
              <p style={{margin: '0'}}>Lv. {this.props.pokemon.level}</p>
          </section>
          {/* shows buttons to edit pokemon info */}
          <section className='team_member_info' style={{width: '100%'}}>

            <div className='team_member_edit_buttons' style={{display: 'flex', justifyContent: 'space-around', padding: '0.25rem'}}>
              <Button size='sm' onClick={this.handleToggleNicknameModal}>
                Nickname
              </Button>

              <Button size='sm' onClick={this.handleToggleMovesModal}>
                Battle
              </Button>
            </div>

            <div className='team_member_edit_buttons' style={{display: 'flex', justifyContent: 'space-around', padding: '0.25rem'}}>
              <Button size='sm' onClick={this.handleToggleIvEvModal}>
                IVs/EVs
              </Button> 
              
              <Button size='sm' variant='danger' onClick={this.props.removeTeamMember}>
                Remove
              </Button>
            </div>


            <ProgressBar now={100} variant='success' style={{margin: '0.25rem'}}/>
          </section>
        </Card.Body>
      </Card>

      {/* Edit pokemon's nickname */}
      <Modal centered show={this.state.showNicknameModal} onHide={this.handleToggleNicknameModal}>
        <Modal.Header>Edit Nickname</Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmitNickname}>
            <Form.Group id='pokemon_nickname_form'>
              <Form.Label>Nickname</Form.Label>
              <Form.Control type='text' placeholder='Enter a nickname...' id='pokemon_nickname' minLength={1} maxLength={12} />
              <Button type='submit'>
               Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Battle Moves, Ability, Held Item */}
      <Modal centered show={this.state.showMovesModal} onHide={this.handleToggleMovesModal}>
        <Modal.Header>
          Edit Pokemon Info
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleSubmitBattleInfo}>
            <Form.Group id='battle_moves' className='battle_moves_form'>
              <Container style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <div>
                    <Form.Label>Ability</Form.Label>
                    <Form.Select id='battle_ability'>
                      {this.props.pokemon.abilities.map(element => (
                        <option value={element.name}>{element.ability.name}</option>
                      ))}
                    </Form.Select>
                  </div>
                  <div>
                    <Form.Label>Held Item</Form.Label>
                    <Form.Select id='held_item'>
                      <option value='Oran Berry'>Coming soon...</option>
                    </Form.Select>  
                  </div>

                </div>
                
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <div>
                    <Form.Label>Move 1</Form.Label>
                    <Form.Select id='move_1'>
                      {this.props.pokemon.moves.map(element => (
                        <option value={element.name}>{element.name}</option>
                      ))}
                    </Form.Select>                    
                  </div>
                  
                  <div>
                    <Form.Label>Move 2</Form.Label>
                    <Form.Select id="move_2">
                      {this.props.pokemon.moves.map(element => (
                        <option value={element.name}>{element.name}</option>
                      ))}
                    </Form.Select>                     
                  </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                  <div>
                    <Form.Label>Move 3</Form.Label>
                    <Form.Select id='move_3'>
                      {this.props.pokemon.moves.map(element => (
                        <option value={element.name}>{element.name}</option>
                      ))}
                    </Form.Select>                    
                  </div>
                  
                  <div>
                    <Form.Label>Move 4</Form.Label>
                    <Form.Select id='move_4'>
                      {this.props.pokemon.moves.map(element => (
                        <option value={element.name}>{element.name}</option>
                      ))}
                    </Form.Select>                     
                  </div>
                </div>

                <div style={{alignSelf: 'flex-end', margin: '1rem'}}>
                  <Button type='submit'>
                    Save
                  </Button>
                </div>
              </Container>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          footer
        </Modal.Footer>
      </Modal>

      {/* IVs, EVs, Level, Nature */}
      <Modal centered show={this.state.showIvEvModal} onHide={this.handleToggleIvEvModal}>
        <Modal.Header>Edit IVs & EVs <span>EV totals must be 510 or less</span></Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmitIvEvInfo} onChange={this.handleFormChange}>  
            <Container id='team_member_stats_edit'>
              {/* HP, ATK, DEF */}
              <div id='hp_phys'>

                {/* HP IV and EV */}
                <Form.Group className='ivev_form'>
                  <Form.Label>HP</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_hp' 
                    placeholder={this.state.pokemon.stats[0].iv ? this.state.pokemon.stats[0].iv : 'IVs'}
                    defaultValue={this.state.pokemon.stats[0].iv ? this.state.pokemon.stats[0].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_hp' 
                    placeholder={this.state.pokemon.stats[0].ev ? this.state.pokemon.stats[0].ev : 'EVs'}
                    defaultValue={this.state.pokemon.stats[0].ev ? this.state.pokemon.stats[0].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                {/* Attack IV and EV */}
                <Form.Group className='ivev_form'>
                  <Form.Label>ATK</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_atk' 
                    placeholder={this.state.pokemon.stats[1].iv ? this.state.pokemon.stats[1].iv : 'IVs'}
                    defaultValue={this.state.pokemon.stats[1].iv ? this.state.pokemon.stats[1].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_atk' 
                    placeholder={this.state.pokemon.stats[1].ev ? this.state.pokemon.stats[1].ev : 'EVs'}
                    defaultValue={this.state.pokemon.stats[1].ev ? this.state.pokemon.stats[1].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                {/* Defense IV and EV */}
                <Form.Group className='ivev_form'>
                  <Form.Label>DEF</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_def' 
                    placeholder={this.state.pokemon.stats[2].iv ? this.state.pokemon.stats[2].iv : 'IVs'}
                    defaultValue={this.state.pokemon.stats[2].iv ? this.state.pokemon.stats[2].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_def' 
                    placeholder={this.state.pokemon.stats[2].ev ? this.state.pokemon.stats[2].ev : 'EVs'}
                    defaultValue={this.state.pokemon.stats[2].ev ? this.state.pokemon.stats[2].ev : 0}  
                    min='0' max='255' ></Form.Control>
                </Form.Group>
              </div>
              
              {/* SPATK, SPDEF, SPD */}
              <div id='spd_special'>

                {/* Special Attack IV and EV */}
                <Form.Group className='ivev_form'>
                  <Form.Label>SPATK</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_spatk' 
                    placeholder={this.state.pokemon.stats[3].iv ? this.state.pokemon.stats[3].iv : 'IVs'}
                    defaultValue={this.state.pokemon.stats[3].iv ? this.state.pokemon.stats[3].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spatk' 
                    placeholder={this.state.pokemon.stats[3].ev ? this.state.pokemon.stats[3].ev : 'EVs'}
                    defaultValue={this.state.pokemon.stats[3].ev ? this.state.pokemon.stats[3].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>

                {/* Special Defense IV and EV */}
                <Form.Group className='ivev_form'>
                  <Form.Label>SPDEF</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_spdef' 
                    placeholder={this.state.pokemon.stats[4].iv ? this.state.pokemon.stats[4].iv : 'IVs'}
                    defaultValue={this.state.pokemon.stats[4].iv ? this.state.pokemon.stats[4].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spdef' 
                    placeholder={this.state.pokemon.stats[4].ev ? this.state.pokemon.stats[4].ev : 'EVs'}
                    defaultValue={this.state.pokemon.stats[4].ev ? this.state.pokemon.stats[4].ev : 0} 
                    min='0' max='255'></Form.Control>
                </Form.Group>

                {/* Speed IV and EV */}
                <Form.Group className='ivev_form'>
                  <Form.Label>SPD</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='iv_spd' 
                    placeholder={this.state.pokemon.stats[5].iv ? this.state.pokemon.stats[5].iv : 'IVs'}
                    defaultValue={this.state.pokemon.stats[5].iv ? this.state.pokemon.stats[5].iv : 0} 
                    min='0' max='31' ></Form.Control>
                  <Form.Control 
                    type="number" 
                    id='ev_spd' 
                    placeholder={this.state.pokemon.stats[5].ev ? this.state.pokemon.stats[5].ev : 'EVs'}
                    defaultValue={this.state.pokemon.stats[5].ev ? this.state.pokemon.stats[5].ev : 0} 
                    min='0' max='255' ></Form.Control>
                </Form.Group>
              </div>
            </Container>

            {/* Level and Nature */}
            <Container id='team_member_level_nature_edit'>
              <div id='level_edit'>
                <Form.Group className='ivev_form'>
                  <Form.Label>Level</Form.Label>
                  <Form.Control 
                    type="number" 
                    id='level' 
                    placeholder={this.state.pokemon.level ? this.state.pokemon.level : 'Level'}
                    defaultValue={this.state.pokemon.level ? this.state.pokemon.level : 100} 
                    min='1' max='100' ></Form.Control>
                </Form.Group>
              </div>

              <div id='nature_edit'>
                <Form.Group className='ivev_form'>
                  <Form.Label>Nature</Form.Label>
                  <Form.Select 
                    id='nature' 
                    defaultValue={this.state.pokemon.nature ? this.state.pokemon.nature : 'bashful'} 
                  >
                    <option value='adamant'>Adamant</option>
                    <option value='bashful'>Bashful</option>
                    <option value='bold'>Bold</option>
                    <option value='brave'>Brave</option>
                    <option value='calm'>Calm</option>
                    <option value='careful'>Careful</option>
                    <option value='docile'>Docile</option>
                    <option value='gentle'>Gentle</option>
                    <option value='hardy'>Hardy</option>
                    <option value='hasty'>Hasty</option>
                    <option value='impish'>Impish</option>
                    <option value='jolly'>Jolly</option>
                    <option value='lax'>Lax</option>
                    <option value='lonely'>Lonely</option>
                    <option value='mild'>Mild</option>
                    <option value='modest'>Modest</option>
                    <option value='naive'>Naive</option>
                    <option value='naughty'>Naughty</option>
                    <option value='quiet'>Quiet</option>
                    <option value='quirky'>Quirky</option>
                    <option value='rash'>Rash</option>
                    <option value='relaxed'>Relaxed</option>
                    <option value='sassy'>Sassy</option>
                    <option value='serious'>Serious</option>
                    <option value='timid'>Timid</option>
                  </Form.Select>
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

export default TeamMember;