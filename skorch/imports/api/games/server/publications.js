import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Documents from '../games';

Meteor.publish('games.list', () => Games.find());

Meteor.publish('games.view', (_id) => {
  check(_id, String);
  return Games.find(_id);
});
