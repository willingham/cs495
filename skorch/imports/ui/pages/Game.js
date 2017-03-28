import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeGame, gamePhraseType } from '../../api/games/methods.js';
import { addGameToUserAccount, gameExistsInUserAccount, removeGameFromUserAccount } from '../../api/user/methods.js';
import LeaderBoardGame from './LeaderBoardGame.js';
import PingPongGame from './PingPongGame.js';

const handleEdit = (_id) => {
  browserHistory.push(`/games/${_id}/edit`);
}

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeGame.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Game deleted!', 'success');
        browserHistory.push('/games');
      }
    });
  }
};

const GetGamePage = (game) => { /* returns component of correct game type */
    if (game.type == 'leaderboard') {
        return <LeaderBoardGame game={ game } />
    } else if (game.type == 'Ping Pong') {
        return <PingPongGame everything={everything.everything} />
    }
    return null;
};

const AddGameButton = (phrase) => {  /* button for adding game to user profile */
    console.log(phrase);
    if (Meteor.user()) {
        if (gameExistsInUserAccount(phrase.phrase)) {
            return <Button className="pull-right" onClick={ () => { removeGameFromUserAccount(phrase.phrase) } }>Remove from My Games</Button>
        } else {
            return <Button className="pull-right" onClick={ () => { addGameToUserAccount(phrase.phrase) } }>Add to My Games</Button>
        }
    }
    return null;
};

const Game = ({ game }) => ( // top-level page for all games
        <div>
            <AddGameButton phrase={ game.phrase } />
            <GetGamePage everything={ game } />
        </div>
);

Game.propTypes = {
  doc: React.PropTypes.object,
};

export default Game;
