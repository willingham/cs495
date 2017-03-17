import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Games from '../../api/games/games.js';
import LeaderBoard from '../pages/LeaderBoardGame.js';
import Loading from '../components/Loading.js';

const composer = ({params}, onData) => {
  const subscription = Meteor.subscribe('games.view', params._id);
  if (subscription.ready()) {
    const game = Games.findOne(params._id);
    onData(null, {game});
  }
};

export default composeWithTracker(composer, Loading)(LeaderBoard);
