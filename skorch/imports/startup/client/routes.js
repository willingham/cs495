/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Games from '../../ui/pages/Games.js';
import NewGame from '../../ui/pages/NewGame.js';
import EditGame from '../../ui/containers/EditGame.js';
import ViewGame from '../../ui/containers/ViewGame.js';
import ModelGame from '../../ui/pages/ModelGame.js';
import ViewModelGame from '../../ui/containers/ViewModelGame.js';
import Game from '../../ui/containers/Game.js';
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';
import JoinGame from '../../ui/pages/JoinGame.js';
import MyGames from '../../ui/pages/MyGames.js';
import ModelBuilder from '../../ui/pages/ModelBuilder';
import Tournament from '../../ui/containers/Tournament';
import createTournament from '../../ui/pages/CreateTournament';

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
        <Route name="games" path="/games" component={ Games } onEnter={ authenticate } />
        <Route name="newGame" path="/game/new" component={ NewGame }  />
        <Route name="editGame" path="/games/:_id/edit" component={ EditGame } onEnter={ authenticate } />
        <Route name="viewGame" path="/games/:_id" component={ ViewGame } onEnter={ authenticate } />

        <Route name="viewModelGame" path="/game/:_phrase" component={ ViewModelGame } /> 
        <Route name="createTournament" path="/tournament/new" component = { createTournament } />
        <Route name="Tournament" path="/tournament/:_phrase" component={Tournament} />
        <Route name="MyGames" path="mygames" component={ MyGames } onEnter={ authenticate } />
        <Route name="join" path="/join" component={ JoinGame } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route name="modelEditor" path="/modeleditor" component={ ModelBuilder } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
