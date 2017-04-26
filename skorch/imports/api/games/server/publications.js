import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Games from '../games';

Meteor.publish('games.list', () => Games.find());

Meteor.publish('games.view', (_id) => {
  check(_id, String);
  return Games.find(_id);
});

Meteor.publish('games.phrase', (_phrase) => {
  check(_phrase, String);
  return Games.find({$or: [{publicGamePhrase: _phrase}, {privateGamePhrase:_phrase}]});
});
