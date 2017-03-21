import {browserHistory} from 'react-router';
import {Bert} from 'meteor/themeteorchef:bert';
import {upsertGame, gamePhraseExists} from '../api/games/methods.js';
import './validation.js';

let component;

const addPoint = (player, value) => {
  const upsert = component;

  upsert.gameData.players.forEach((element) => {
    if (element["player"] == player)
      element["score"] += value;
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

export function AddPoint(options) {
  component = options.game;
  addPoint(options.player, options.value)
}

export function AddPlayer(options) {
  component = options.component;
  addPlayer();
}

export function IsValidGamePhrase(phrase) {
  return gamePhraseExists(phrase);
}
