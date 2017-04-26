import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Games from '../../api/games/games.js';
import { getTournamentModel } from '../../api/tournaments/methods.js';
import Tournaments from '../../api/tournaments/tournaments';
import Tournament from '../pages/Tournament.js';
import Loading from '../components/Loading.js';

const composer = ({params}, onData) => {
  const tournamentPhrase = params._phrase.toLowerCase();
  const subscription = Meteor.subscribe('tournaments.phrase', tournamentPhrase);
  if (subscription.ready()) {
    const tourn = getTournamentModel(tournamentPhrase);
    onData(null, {tourn});
  }
};

export default composeWithTracker(composer, Loading)(Tournament);
