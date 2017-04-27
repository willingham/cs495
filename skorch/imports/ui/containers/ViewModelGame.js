import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Games from '../../api/games/games.js';
import { getGameByPhrase } from '../../api/games/methods.js'
import ModelGame from '../pages/ModelGame.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const gamePhrase = params._phrase;
  const subscription = Meteor.subscribe('games.phrase', gamePhrase);

  if (subscription.ready()) {
    const game = getGameByPhrase(gamePhrase);
    onData(null, {
        id: game._id,
        title: game.title,
        publicGamePhrase: game.publicGamePhrase,
        privateGamePhrase: game.privateGamePhrase,
        teams: game.teams,
        modelName: game.modelName,
        playerConditions: game.playerConditions,
        playerCounters: game.playerCounters,
        pagePhrase: gamePhrase
    });
  }
};

export default composeWithTracker(composer, Loading)(ModelGame);
