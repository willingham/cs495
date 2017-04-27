import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import GameModel from './gameModel';
import rateLimit from '../../modules/rate-limit.js';

export const upsertGameModel = new ValidatedMethod({
  name: 'gameModel.upsert',
  validate: GameModel.schema.validator(),
  run(gameModel) {
    let _id = gameModel._id;
    if (gameModel._id) delete gameModel._id;
    return GameModel.upsert({ _id: _id }, { $set: gameModel });
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
  return GameModel.findOne({_id:id});
};
export const getGameModelByTitle = (title) => {
  return GameModel.findOne({title:title});
};

export const getModelByName = (name) => {
    model = GameModel.findOne({title:name});
    if (!model) {
        return null;
    }

    let teams = [];
    for (let i=1; i<= model.numTeams; i++) {
        teams.push({
            name: "Team" + i,
            counters: model.teamCounters,
            players: [],
            conditions: model.teamConditions
        });
    }

    return {
        teams: teams,
        playerCounters: model.playerCounters,
        playerConditions: model.playerConditions,
    };
};


rateLimit({
  methods: [
      upsertGameModel,
  ],
  limit: 5,
  timeRange: 1000,
});
