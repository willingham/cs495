import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Alert, Table } from 'react-bootstrap';
import {AddPoint} from '../../modules/game-functions.js';

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
            <tr key={player} onClick={()=>AddPoint({component: game, player: player, value: 1})}>
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

