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

let player = new SimpleSchema({
  player: {
    type:String
  },
  scores: {
    type: Object
  }
});
let gameOptions = new SimpleSchema({
  players: {
    type:[player],
    optional: true
  }
});

Games.schema = new SimpleSchema({
  _id: { type: String, optional: true },
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
  },
  gameData: {
    type: gameOptions,
    optional: true
  }
});

Games.attachSchema(Games.schema);

Factory.define('game', Games, {
  gameTitle: () => 'Game title',
  gamePhrasePublic: () => 'Public game phrase',
  gamePhrasePrivate: () => 'Private game phrase',
  gameType: () => 'Type of game',
  gameWinner: () => 'Winner of game',
  gameData: () => 'Metadata of game',
});
