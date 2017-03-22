import React from 'react';
import {PingPongScoreBoard} from '../components/LeaderBoardGame.js';
import {AddPlayerComponent} from '../components/GenericGameParts.js';

const PingPongGameScreen = ({ everything }) => (
  <div>
    <h4 className="page-header">Ping Pong Score Board for {everything.game.gameTitle}!</h4>
    {(everything.game.gamePhrasePrivate === everything.phrase) ? <div><AddPlayerComponent game={everything.game} /> <br /></div> : ""}
    <PingPongScoreBoard game={everything.game} phrase={everything.phrase}/>
  </div>
);

PingPongGameScreen.propTypes = {
  everything: React.PropTypes.object,
};

export default PingPongGameScreen;
