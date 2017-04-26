import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const GameModel = new Mongo.Collection('GameModel');

GameModel.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

GameModel.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const modifier = new SimpleSchema({
    btnText: { type: String },
    alexaCommand: { type: String },
    code: { type: String }
});

const counter = new SimpleSchema({
    name: { type: String },
    value: { type: Number, optional: true },
    modifiers: { type: [modifier], optional: true },
    code: { type: String, optional: true }
});

const condition = new SimpleSchema({
    condition: { type: String },
    code: { type: String }
});


GameModel.schema = new SimpleSchema({
  _id: { type: String, optional: true },
  title: {type:String},
  numTeams: { type: Number },
  teamCounters: { type: [counter] },
  playerCounters: { type: [counter] },
  teamConditions: { type: [condition] },
  playerConditions: { type: [condition] },
});

GameModel.attachSchema(GameModel.schema);

export default GameModel;
