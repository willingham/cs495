import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Tournaments from '../tournaments';
import Generator from 'adjective-animal';

Meteor.publish('tournaments.list', () => Tournaments.find());

Meteor.publish('tournaments.view', (_id) => {
  check(_id, String);
  return Tournaments.find(_id);
});

Meteor.publish('tournaments.phrase', (_phrase) => {
  console.log("I'm checking for phrase: "+_phrase);
  check(_phrase, String);
  return Tournaments.find({$or: [{tournamentPhrasePublic: _phrase}, {tournamentPhrasePrivate:_phrase}]});
});

Meteor.methods({'phrasegenerator': () => {
  return Generator.generateName().split('-').join('');
}});

