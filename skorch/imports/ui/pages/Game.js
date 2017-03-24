import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeGame } from '../../api/games/methods.js';
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

const GetGamePage = (everything) => { /* returns component of correct game type */
    if (everything.everything.game.gameType == 'Leader Board') {
        return <LeaderBoardGame everything={everything.everything} />
    } else if (everything.everything.game.gameType == 'Ping Pong') {
        return <PingPongGame everything={everything.everything} />
    }
};

const AddGameButton = () => {  /* button for adding game to user profile */
    if (Meteor.user()) {
        return <Button className="pull-right">Add to My Games</Button>
    }
    return null;
};

const Game = ({ everything }) => ( // top-level page for all games
        <div>
            <AddGameButton />
            <GetGamePage everything={everything} />
        </div>
);

Game.propTypes = {
  doc: React.PropTypes.object,
};

export default Game;
