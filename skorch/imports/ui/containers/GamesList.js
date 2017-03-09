import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Games from '../../api/games/games.js';
import GamesList from '../components/GamesList.js';
import Loading from '../components/Loading.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('games.list');
  if (subscription.ready()) {
    const games = Games.find().fetch();
    onData(null, { games });
  }
};

export default composeWithTracker(composer, Loading)(GamesList);
