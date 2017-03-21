import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Games from './games';
import rateLimit from '../../modules/rate-limit.js';

export const upsertGame = new ValidatedMethod({
  name: 'game.upsert',
  validate: Games.schema.validator(),
  run(game) {
    let _id = game._id;
    if (game._id) delete game._id;
    return Games.upsert({ _id: _id }, { $set: game });
  },
});

export const removeGame = new ValidatedMethod({
  name: 'games.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Games.remove(_id);
  },
});

export const gamePhraseExists = (phrase) => {
  //const match = Games.findOne({$or: [{gamePhrasePublic: phrase}, {gamePhrasePrivate:phrase}]});
  if (true)
    return true;
  else
    return false;
};

rateLimit({
  methods: [
    upsertGame,
    removeGame,
  ],
  limit: 5,
  timeRange: 1000,
});
