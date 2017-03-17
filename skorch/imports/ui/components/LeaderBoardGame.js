import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Alert, Table } from 'react-bootstrap';
import {lbAddPoint, lbAddPlayer} from '../../modules/leader-board-game.js';

export class LeaderBoardScoreBoard extends React.Component {
  componentDidMount() {
  }

  render() {
    const {game} = this.props;
    return (
      (game.gameData && game.gameData.players && game.gameData.players.length > 0) ?
        <Table striped bordered condensed hover>
          <thead><tr><th>Name</th><th>Score</th></tr></thead>
          <tbody>
          {game.gameData.players.map(({player, score}) => (
            <tr key={player} onClick={()=>lbAddPoint({component: game, player: player})}>
              <td>{player}</td>
              <td>{score}</td>
            </tr>
          ))}
          </tbody>
        </Table>
        :
        <Alert bsStyle="warning">No players yet.</Alert>
    );
  }
}

LeaderBoardScoreBoard.propTypes = {
  game: React.PropTypes.object,
};

export class LeaderBoardAddPlayer extends React.Component {
  componentDidMount() {
  }
  render () {
    const {game} = this.props;
    return(
      <div>
        <FormGroup>
          <ControlLabel>New Player Name</ControlLabel>
          <FormControl
            type="text"
            name="playerName"
            defaultValue=""
          />
        </FormGroup>
        <Button
          bsStyle="success"
          onClick={()=>lbAddPlayer({component:game})}
        >Add Player</Button>
      </div>
    )
  }
}
LeaderBoardAddPlayer.propTypes = {
  game: React.PropTypes.object,
};
