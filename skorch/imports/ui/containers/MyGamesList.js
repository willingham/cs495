import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import MyGamesList from '../components/MyGamesList.js';
import Loading from '../components/Loading.js';

const composer = (params, onData) => {
    const subscription = Meteor.subscribe('user.data');
    if (subscription.ready()) {
        const user = Meteor.users.find().fetch(1);
        const games = user[0].profile.games;
        onData(null, { games });
    }
};

export default composeWithTracker(composer, Loading)(MyGamesList);
