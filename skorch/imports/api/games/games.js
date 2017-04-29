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

const condition = new SimpleSchema({
  condition: { type: String, optional: true },
  code: { type: String, optional: true }
})

let modifier = new SimpleSchema({
  btnText: { type: String, optional: true },
  alexaCommand: { type: String, optional: true },
  code: { type: String, optional: true }
});

let counter = new SimpleSchema({
  value: { type: Number, optional: true },
  name: { type: String },
  modifiers: { type: [modifier], optional: true},
  code: { type: String, optional: true }
});

let player = new SimpleSchema({
  name: { type: String },
  conditions: { type: [condition], optional: true },
  counters: { type: [counter], optional: true },
  status: { type: String, optional: true }
})

let team = new SimpleSchema({
  name: { type:String },
  counters: { type: [counter], optional: true },
  conditions: { type: [condition], optional: true },
  players: { type: [player], optional: true },
  status: { type: String, optional: true }
});

Games.schema = new SimpleSchema({
  _id: { type: String, optional: true },
  title: {
    type: String,
    label: 'The title of the game.',
    optional: true,
  },
  publicGamePhrase: {
    type: String,
    label: 'The public game phrase.',
    optional: true,
  },
  privateGamePhrase: {
    type: String,
    label: 'The private game phrase.',
    optional: true,
  },
  teams: {
    type: [team],
    optional: true
  },
  modelName: {
      type: String,
      optional: true
  },
  playerCounters: {
      type: [counter],
      optional: true
  },
  playerConditions: {
      type: [condition],
      optional: true
  }
});

Games.attachSchema(Games.schema);

