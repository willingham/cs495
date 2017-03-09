import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Games from './games';
import rateLimit from '../../modules/rate-limit.js';

export const upsertGame = new ValidatedMethod({
  name: 'game.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    gameTitle: {
      type: String,
      optional: true,
    },
    gamePhrasePublic: { type: String,
      optional: true,
    },
    gamePhrasePrivate: {
      type: String,
      optional: true,
    },
    gameType: {
      type: String,
      optional: true,
    },
    gameWinner: {
      type: String,
      optional: true,
    }
  }).validator(),
  run(game) {
    return Games.upsert({ _id: game._id }, { $set: game });
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

rateLimit({
  methods: [
    upsertGame,
    removeGame,
  ],
  limit: 5,
  timeRange: 1000,
});
