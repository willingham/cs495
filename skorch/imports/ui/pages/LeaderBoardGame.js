import React from 'react';
import {LeaderBoardScoreBoard} from '../components/LeaderBoardGame.js';
import {AddPlayerComponent} from '../components/GenericGameParts.js';

const LeaderBoardGameScreen = ({ game }) => (
  <div>
    <h4 className="page-header">Leader Board for {game.gameTitle}!</h4>
    <AddPlayerComponent game={game} />
    <LeaderBoardScoreBoard game={game} />
  </div>
);

LeaderBoardGameScreen.propTypes = {
  game: React.PropTypes.object,
};

export default LeaderBoardGameScreen;
