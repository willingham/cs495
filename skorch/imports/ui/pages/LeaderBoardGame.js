import React from 'react';
import {LeaderBoardScoreBoard, LeaderBoardAddPlayer} from '../components/LeaderBoardGame.js';

const LeaderBoardGameScreen = ({ game }) => (
  <div>
    <h4 className="page-header">Leader Board for {game.gameTitle}</h4>
    <LeaderBoardAddPlayer game={game} />
    <LeaderBoardScoreBoard game={game} />
  </div>
);

LeaderBoardGameScreen.propTypes = {
  game: React.PropTypes.object,
};

export default LeaderBoardGameScreen;
