import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Alert, Table } from 'react-bootstrap';
import {ProgressGame} from '../../modules/tournament-functions.js';

export class ProgressGameComponent extends React.Component {
  componentDidMount() {
  }
  render() {
    const {tourn, game, player1, player2} = this.props;
    return (
      <div>
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
/*  }
}*/
