import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Games from '../../api/games/games.js';
import LeaderBoard from '../pages/LeaderBoardGame.js';
import Loading from '../components/Loading.js';

const composer = ({params}, onData) => {
  const subscription = Meteor.subscribe('games.phrase', params._phrase);
  if (subscription.ready()) {
    const game = Games.findOne({$or:[{gamePhrasePublic:params._phrase}, {gamePhrasePrivate:params._phrase}]});
    onData(null, {game});
  }
};

export default composeWithTracker(composer, Loading)(LeaderBoard);
