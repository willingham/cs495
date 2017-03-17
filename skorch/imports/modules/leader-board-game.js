import {browserHistory} from 'react-router';
import {Bert} from 'meteor/themeteorchef:bert';
import {upsertGame} from '../api/games/methods.js';
import './validation.js';

let component;

const addPoint = (player) => {
  let doc = component;
  const upsert = {
    gameTitle: doc.gameTitle,
    gamePhrasePublic: doc.gamePhrasePublic,
    gamePhrasePrivate: doc.gamePhrasePrivate,
    gameType: doc.gameType,
    gameWinner: doc.gameWinner,
    gameData: doc.gameData
  };
  if (doc && doc._id) upsert._id = doc._id;

  upsert.gameData.players.forEach((element) => {
    if (element["player"] == player)
      element["score"] += 1;
  });
  upsertGame.call(upsert, (error) => {
    if (error)
      Bert.alert(error.reason, 'danger');
    else {
      Bert.alert("Success", 'success');
    }
  });
};

const addPlayer = () => {
  const upsert = component;
  const player = document.querySelector('[name="playerName"]').value.trim();
  if (player === ""){
    Bert.alert("Please insert name", 'danger');
    return;
  }
  let shouldReturn = false;
  if (upsert.gameData && upsert.gameData.players) {
    upsert.gameData.players.forEach((element) => {
      if (element["player"] == player) {
        Bert.alert("Player '" + player + "' already exists.", 'danger');
        shouldReturn = true;
      }
    });
  } else {
    if (!upsert.gameData)
      upsert.gameData = {};
    upsert.gameData.players = [];
  }
  if (shouldReturn) return;

  upsert.gameData.players.push({player:player, score:0});
  upsertGame.call(upsert, (error) => {
    if (error)
      Bert.alert(error.reason, 'danger');
    else
      Bert.alert("Success", 'success');
  });
};

export function lbAddPoint(options) {
  component = options.component;
  addPoint(options.player)
}

export function lbAddPlayer(options) {
  component = options.component;
  addPlayer();
}
