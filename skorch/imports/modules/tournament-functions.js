import {upsertTournament} from '../api/tournaments/methods.js';
import {Bert} from 'meteor/themeteorchef:bert';

let component;

const progressGame = (gameId, playerId, playerName) => {
  const upsert = component;

  upsert.gameData.forEach((level) => {
    level.games.forEach((game) => {
      if (game["id"] == gameId) {
        game.winner = playerId;
      }
      if (game.home.gameId == gameId) {
        game.home.id = playerId;
        game.home.name = playerName;
      }
      if (game.visitor.gameId == gameId) {
        game.visitor.id = playerId;
        game.visitor.name = playerName;
      }
    });
  });
  upsertTournament.call(upsert, (error) => {
    if (error)
      Bert.alert(error.reason, 'danger');
    else
      Bert.alert("Success", 'success');
  })
};

export function ProgressGame(options) {
  component = options.tourn;
  progressGame(options.gameId, options.playerId, options.playerName);
}
