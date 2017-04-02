import React from 'react';
import {LeaderBoardScoreBoard} from '../components/LeaderBoardGame.js';
import {AddPlayerComponent} from '../components/GenericGameParts.js';
import { gamePhraseType } from "../../api/games/methods.js";

const LeaderBoardGameScreen = ({game}) => (
   console.log(game),
  <div>
    <h4 className="page-header">Leader Board for {game.gameTitle}!</h4>
    { 
        console.log(gamePhraseType(game.game.phrase)),
        gamePhraseType(game.game.phrase) === 'private' &&  <div><AddPlayerComponent game={game.game} /> <br /></div>
    
    }
    <LeaderBoardScoreBoard game={game.game} phrase={game.game.phrase}/>
  </div>
);

LeaderBoardGameScreen.propTypes = {
  everything: React.PropTypes.object,
};

export default LeaderBoardGameScreen;
