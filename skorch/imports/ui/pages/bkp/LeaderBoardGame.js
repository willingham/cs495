import React from 'react';
import {LeaderBoardScoreBoard} from '../components/LeaderBoardGame.js';
import {AddPlayerComponent} from '../components/GenericGameParts.js';

const LeaderBoardGameScreen = ({ everything }) => (
  <div>
    <h4 className="page-header">Leader Board for {everything.game.gameTitle}!</h4>
    {(everything.game.gamePhrasePrivate === everything.phrase) ? <div><AddPlayerComponent game={everything.game} /> <br /></div> : ""}
    <LeaderBoardScoreBoard game={everything.game} phrase={everything.phrase}/>
  </div>
);

LeaderBoardGameScreen.propTypes = {
  everything: React.PropTypes.object,
};

export default LeaderBoardGameScreen;
