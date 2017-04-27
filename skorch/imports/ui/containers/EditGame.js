import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Games from '../../api/games/games.js';
import GameModel from '../../api/gameModel/gameModel.js';
import EditGame from '../pages/EditGame.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('games.view', params._id);

  if (subscription.ready()) {
    const doc = Games.findOne(params._id);
    onData(null, { doc });
  }
};

export default composeWithTracker(composer, Loading)(EditGame);
