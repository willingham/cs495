import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import GameModel from './gameModel';
import rateLimit from '../../modules/rate-limit.js';

export const upsertGameModel = new ValidatedMethod({
  name: 'gameModel.upsert',
  validate: GameModel.schema.validator(),
  run(model) {
    let _id = model._id;
    if (model._id) delete model._id;
    return GameModel.upsert({ _id: _id }, { $set: model });
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

rateLimit({
  methods: [
      upsertGameModel,
  ],
  limit: 5,
  timeRange: 1000,
});
