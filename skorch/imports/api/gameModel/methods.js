import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import GameModel from './gameModel';
import rateLimit from '../../modules/rate-limit.js';

export const upsertGameModel = new ValidatedMethod({
  name: 'gameModel.upsert',
  validate: new SimpleSchema({
      _id: { type: String, optional: true },
      name: { type: String, optional: true },
      model: { type: Object, optional: true },
  }).validator(),
  run(model) {
    return GameModel.upsert({ _id: model._id }, { $set: model });
  },
});

export const removeGameModel = new ValidatedMethod({
  name: 'gameModel.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    GameModel.remove(_id);
  },
});

export const getGameModelById = (id) => {
  return GameModel.find({_id:id});
}


rateLimit({
  methods: [
      upsertGameModel,
  ],
  limit: 5,
  timeRange: 1000,
});
