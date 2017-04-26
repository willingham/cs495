import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Games from '../../api/games/games.js';
import { getGameByPhrase } from '../../api/games/methods.js'
import ModelGame from '../pages/ModelGame.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const gamePhrase = params._phrase;
  console.log(gamePhrase);
  const subscription = Meteor.subscribe('games.phrase', gamePhrase); 

  if (subscription.ready()) {
    const game = getGameByPhrase(gamePhrase);
    console.log(game);
    onData(null, { title: game.title, publicGamePhrase: game.publicGamePhrase, privateGamePhrase: game.privateGamePhrase, teams: game.teams });
  }
};

export default composeWithTracker(composer, Loading)(ModelGame);
