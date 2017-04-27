/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertGame } from '../api/games/methods.js';
import { getModelByName } from '../api/gameModel/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { doc } = component.props;
  const confirmation = doc && doc._id ? 'Game updated!' : 'Game added!';
  const modelName = document.querySelector('[name="modelName"]').value.trim();
  let model = getModelByName(modelName);

  Meteor.call('gamephrasegenerator', function(err, privatePhrase) {
    Meteor.call('gamephrasegenerator', function(err, publicPhrase) {
      const upsert = {
        title: document.querySelector('[name="gameTitle"]').value.trim(),
        publicGamePhrase: publicPhrase,
        privateGamePhrase: privatePhrase,
        modelName: modelName,
        teams: model.teams,
        playerCounters: model.playerCounters,
        playerConditions: model.playerConditions,
      };

      if (doc && doc._id) upsert._id = doc._id;

      upsertGame.call(upsert, (error, response) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          component.gameEditorForm.reset();
          Bert.alert(confirmation, 'success');
          browserHistory.push(`/game/${privatePhrase}`);
        }
      });
    })
  })


};

const validate = () => {
  $(component.gameEditorForm).validate({
    rules: {
      title: { required: true, },
      //publicGamePhrase: { required: true, },
      //privateGamePhrase: { required: true, },
      modelName: { required: true, },
    },
    messages: {
      title: {
        required: 'Need a game title.',
      },
      publicGamePhrase: {
        required: 'Need a public game phrase.',
      },
      privateGamePhrase: {
        required: 'Need a private game phrase.',
      },
      modelName: {
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
