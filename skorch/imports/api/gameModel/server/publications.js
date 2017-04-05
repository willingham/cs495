import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import GameModel from '../gameModel';

Meteor.publish('gameModel.list', () => GameModel.find());

Meteor.publish('gameModel.view', (_id) => {
  check(_id, String);
  return GameModel.find(_id);
});
