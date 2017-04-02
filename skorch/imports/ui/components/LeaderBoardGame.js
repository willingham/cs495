import React from 'react';
import { FormGroup, ControlLabel, FormControl, ButtonToolbar, ButtonGroup, Button, Alert, Table, Glyphicon } from 'react-bootstrap';
import {AddPoint} from '../../modules/game-functions.js';
import { gamePhraseType } from '../../api/games/methods.js';

const checkGamePhraseAndAddPoints = (options) => {
  if (gamePhraseType(options.phrase) === 'private' ) {
    AddPoint(options);
  }
}

export class LeaderBoardScoreBoard extends React.Component {
  componentDidMount() {
      console.log(this.props);
  }

  render() {
    const {game, phrase} = this.props;
    return (
      (game.gameData && game.gameData.players && game.gameData.players.length > 0) ?
        <Table striped bordered condensed hover>
          <thead><tr><th>Name</th><th>Score</th></tr></thead>
          <tbody>
          {game.gameData.players.map(({player, score}) => (
            <tr key={player} onClick={()=>checkGamePhraseAndAddPoints({game: game, player: player, value: 1, phrase: phrase})}>
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

export class PingPongScoreBoard extends React.Component {
  componentDidMount() {
  }

  render() {
    const {game, phrase} = this.props;
    return (
      (game.gameData && game.gameData.players && game.gameData.players.length > 0) ?
        <ButtonToolbar>
          {game.gameData.players.map(({player, score}) => (
          <ButtonGroup>
            <div> {player} </div>
              <Button bsStyle="primary" onClick={()=>checkGamePhraseAndAddPoints({game: game, player: player, value: 1, phrase: phrase})}><Glyphicon glyph="plus" /></Button>
              <Button>{score}</Button>
              <Button bsStyle="primary" onClick={()=>checkGamePhraseAndAddPoints({game: game, player: player, value: -1, phrase: phrase})}><Glyphicon glyph="minus" /></Button>
          </ButtonGroup>
          ))}
        </ButtonToolbar>
        :
        <Alert bsStyle="warning">No players yet.</Alert>
    );
  }
}

PingPongScoreBoard.propTypes = {
  game: React.PropTypes.object,
}

LeaderBoardScoreBoard.propTypes = {
  game: React.PropTypes.object,
};

