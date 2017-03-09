import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Games = new Mongo.Collection('Games');
export default Games;

Games.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Games.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Games.schema = new SimpleSchema({
  gameTitle: {
    type: String,
    label: 'The title of the game.',
  },
  gamePhrasePublic: {
    type: String,
    label: 'The public game phrase.',
  },
  gamePhrasePrivate: {
    type: String,
    label: 'The private game phrase.',
  },
  gameType: {
    type: String,
    label: 'The type of game.',
  },
  gameWinner: {
    type: String,
    label: 'The winner of the game.',
  }
});

Games.attachSchema(Games.schema);

Factory.define('game', Games, {
  gameTitle: () => 'Game title',
  gamePhrasePublic: () => 'Public game phrase',
  gamePhrasePrivate: () => 'Private game phrase',
  gameType: () => 'Type of game',
  gameWinner: () => 'Winner of game',
});
