import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Alert, Table } from 'react-bootstrap';
import {ProgressGame} from '../../modules/tournament-functions.js';
import ReactListInput from 'react-list-input';
import {createTournament} from '../../api/tournaments/methods.js';

export class ProgressGameComponent extends React.Component {
  componentDidMount() {
  }
  render() {
    const {tourn, game, player1, player2} = this.props;
    return (
      <div className="tournamentButtons">
      <h3>{player1.name} vs {player2.name}</h3>
      <Button
        bsStyle="success"
        onClick={()=>ProgressGame({tourn:tourn, gameId: game.id, playerId: player1.id, playerName: player1.name})}
      >{player1.name} won</Button>
      <Button
        bsStyle="success"
        onClick={()=>ProgressGame({tourn:tourn, gameId: game.id, playerId: player2.id, playerName: player2.name})}
      >{player2.name} won</Button>
    </div>
    )
  }
}
ProgressGameComponent.propTypes = {
  tourn: React.PropTypes.object,
  game: React.PropTypes.object,
  player1: React.PropTypes.object,
  player2: React.PropTypes.object
};

/*export class ListOfProgress extends React.Component {
  componentDidMount(){
  }
  render() {*/
export const ListOfProgress = ({tourn, games}) => (
    //const {tourn, games} = this.props;
    <div>
      {games.map(function (game, index) {
        return <div key={game.id}>
          <ProgressGameComponent tourn={tourn} game={game} player1={game.sides.home.team} player2={game.sides.visitor.team}/>
        </div>;
      })}
    </div>
);

const Input = ({value, onChange, type = 'text'}) =>
  <input type={type} value={value} onChange={e => onChange(e.target.value)} />

export class AddPlayers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ['a', 'b']
    }
  }

  Item ({decorateHandle, removable, onChange, onRemove, value}) {
    return (
      <div>
        {decorateHandle(<span style={{cursor: 'move'}}>+</span>)}
        <span
          onClick={removable ? onRemove : x => x}
          style={{
            cursor: removable ? 'pointer' : 'not-allowed',
            color: removable ? 'black' : 'gray'
          }}>X</span>
        <Input value={value} onChange={onChange} />
      </div>
    )
  }

  StagingItem ({value, onAdd, canAdd, add, onChange}) {
    return (
      <div>
        <span
          onClick={canAdd ? onAdd : undefined}
          style={{
            color: canAdd ? 'black' : 'gray',
            cursor: canAdd ? 'pointer' : 'not-allowed'
          }}
        >Add</span>
        <Input value={value} onChange={onChange} />
      </div>
    )
  }

  render () {
    return (
      <div>
      <ReactListInput
        initialStagingValue=''
        onChange={value => this.setState({value})}
        maxItems={64}
        minItems={2}
        ItemComponent={this.Item}
        StagingComponent={this.StagingItem}
        value={this.state.value}
      />
        <Button onClick={() => {createTournament(this.state.value);}}>Start</Button>
      </div>
    )
  }
}
/*  }
}*/
