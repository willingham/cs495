import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const GameModel = new Mongo.Collection('GameModel');
export default GameModel;

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

let counter = new SimpleSchema({
  name: {type:String},
  start:{type:Number},
  modifiers:{type:[new SimpleSchema({
      btnText: {type: String},
      alexaCommand: {type: String},
      code: {type: String}
    })]}});
GameModel.schema = new SimpleSchema({
  _id: { type: String, optional: true },
  name: {type:String},
  model: {
    label: 'The object containing all the game model information.',
    type: new SimpleSchema({
      numTeams: { type: Number},
      playerCounters: {type: [counter]},
      //teamCounters: {type:[counter]}
    })
  }
});

GameModel.attachSchema(GameModel.schema);
