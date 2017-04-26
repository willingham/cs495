import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Tournaments = new Mongo.Collection('Tournaments');
export default Tournaments;

Tournaments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Tournaments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});
let team = new SimpleSchema({
  id:{type:String, optional:true},
  name: {type:String, optional:true},
  gameId: {type:String, optional:true}
});

let game = new SimpleSchema({
  id:{type:String},
  leaf: {type:String},
  home: {type:team},
  visitor: {type:team},
  winner: {type:String, optional:true}
});

let bracketLevel = new SimpleSchema({
  games:{
    type:[game]
  }
});

Tournaments.schema = new SimpleSchema({
  _id: { type: String, optional: true },
  tournamentTitle: {
    type: String,
    label: 'The title of the tournament.',
  },
  tournamentPhrasePublic: {
    type: String,
    label: 'The public tournament phrase.',
  },
  tournamentPhrasePrivate: {
    type: String,
    label: 'The private tournament phrase.',
  },
  gameData: {
    type: [bracketLevel],
    optional: true
  }
});

Tournaments.attachSchema(Tournaments.schema);

/*Factory.define('game', Games, {
  gameTitle: () => 'Game title',
  gamePhrasePublic: () => 'Public game phrase',
  gamePhrasePrivate: () => 'Private game phrase',
  gameType: () => 'Type of game',
  gameWinner: () => 'Winner of game',
  gameData: () => 'Metadata of game',
});*/
