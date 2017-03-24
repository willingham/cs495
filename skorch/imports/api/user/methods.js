import rateLimit from '../../modules/rate-limit.js';

export const addGameToUserAccount = (gamePhrase) => {
    Meteor.users.update({_id:Meteor.user()._id}, {$push: { 'profile.games':gamePhrase }});
}

export const gameExistsInUserAccount = (gamePhrase) => {
    return Meteor.users.find({ 'profile.games': { $in: [gamePhrase] } }).count();
}

export const removeGameFromUserAccount = (gamePhrase) => {
    Meteor.users.update( { _id: Meteor.user()._id }, { $pull: { 'profile.games' : gamePhrase } } );
}

rateLimit({
  methods: [
    addGameToUserAccount,
    removeGameFromUserAccount,
  ],
  limit: 5,
  timeRange: 1000,
});
