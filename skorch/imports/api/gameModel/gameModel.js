import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const GameModel = new Mongo.Collection('GameModel');
export default GameModel;

GamesModel.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

GameModel.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

GameModel.schema = new SimpleSchema({
  _id: { type: String, optional: true },
  model: {
    type: String,
    label: 'The object containing all the game model information.',
  }
});

GameModel.attachSchema(GameModel.schema);
