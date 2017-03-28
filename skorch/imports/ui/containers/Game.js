import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Games from '../../api/games/games.js';
import { getGameByPhrase } from '../../api/games/methods.js';
import Game from '../pages/Game.js';
import Loading from '../components/Loading.js';

const composer = ({params}, onData) => {
  const gamePhrase = params._phrase.toLowerCase();
  const subscription = Meteor.subscribe('games.phrase', gamePhrase);
  if (subscription.ready()) {
    const game = getGameByPhrase(gamePhrase);;
    onData(null, {game});
  }
};

export default composeWithTracker(composer, Loading)(Game);
