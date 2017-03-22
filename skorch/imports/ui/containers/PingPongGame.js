import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Games from '../../api/games/games.js';
import PingPongBoard from '../pages/PingPongGame.js';
import Loading from '../components/Loading.js';

const composer = ({params}, onData) => {
  const gamePhrase = params._phrase.toLowerCase();
  const subscription = Meteor.subscribe('games.phrase', gamePhrase);
  if (subscription.ready()) {
    const game = Games.findOne({$or:[{gamePhrasePublic:gamePhrase}, {gamePhrasePrivate:gamePhrase}]});
    const everything = {game:game, phrase:gamePhrase};
    onData(null, {everything});
  }
};

export default composeWithTracker(composer, Loading)(PingPongBoard);
