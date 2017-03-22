/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Documents from '../../ui/pages/Documents.js';
import NewDocument from '../../ui/pages/NewDocument.js';
import EditDocument from '../../ui/containers/EditDocument.js';
import ViewDocument from '../../ui/containers/ViewDocument.js';
import Games from '../../ui/pages/Games.js';
import NewGame from '../../ui/pages/NewGame.js';
import EditGame from '../../ui/containers/EditGame.js';
import ViewGame from '../../ui/containers/ViewGame.js';
import LeaderBoardGame from '../../ui/containers/LeaderBoardGame.js';
import Game from '../../ui/containers/Game.js';
import PingPongGame from '../../ui/containers/PingPongGame.js';
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';
import JoinGame from '../../ui/pages/JoinGame.js';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />
        <Route name="documents" path="/documents" component={ Documents } onEnter={ authenticate } />
        <Route name="newDocument" path="/documents/new" component={ NewDocument } onEnter={ authenticate } />
        <Route name="editDocument" path="/documents/:_id/edit" component={ EditDocument } onEnter={ authenticate } />
        <Route name="viewDocument" path="/documents/:_id" component={ ViewDocument } onEnter={ authenticate } />
        <Route name="games" path="/games" component={ Games } onEnter={ authenticate } />
        <Route name="newGame" path="/games/new" component={ NewGame } onEnter={ authenticate } />
        <Route name="editGame" path="/games/:_id/edit" component={ EditGame } onEnter={ authenticate } />
        <Route name="viewGame" path="/games/:_id" component={ ViewGame } onEnter={ authenticate } />
        /* <Route name="leaderBoardGame" path="/play/:_phrase" component={ LeaderBoardGame } />  not needed due to /game/:_phrase route
        <Route name="pingPongGame" path="/pingpong/:_phrase" component={ PingPongGame } /> */
        <Route name="Game" path="/game/:_phrase" component={ Game } /> // master page for all game types
        <Route name="join" path="/join" component={ JoinGame } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
