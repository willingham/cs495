/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertGame } from '../api/games/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { doc } = component.props;
  const confirmation = doc && doc._id ? 'Game updated!' : 'Game added!';
  const upsert = {
    gameTitle: document.querySelector('[name="gameTitle"]').value.trim(),
    gamePhrasePublic: document.querySelector('[name="gamePhrasePublic"]').value.trim(),
    gamePhrasePrivate: document.querySelector('[name="gamePhrasePrivate"]').value.trim(),
    gameType: document.querySelector('[name="gameType"]').value.trim(),
    gameWinner: document.querySelector('[name="gameWinner"]').value.trim(),
  };

  if (doc && doc._id) upsert._id = doc._id;

  upsertGame.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.gameEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/games/${response.insertedId || doc._id}`);
    }
  });
};

const validate = () => {
  $(component.gameEditorForm).validate({
    rules: {
      gameTitle: { required: true, },
      gamePhrasePublic: { required: true, },
      gamePhrasePrivate: { required: true, }, gameType: { required: true, },
      gameWinner: { required: false, },
    },
    messages: {
      gameTitle: {
        required: 'Need a game title.',
      },
      gamePhrasePublic: {
        required: 'Need a public game phrase.',
      },
      gamePhrasePrivate: {
        required: 'Need a private game phrase.',
      },
      gameType: {
        required: 'Need a game type.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function gameEditor(options) {
  component = options.component;
  validate();
}
