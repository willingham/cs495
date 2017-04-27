import React from 'react';
import {Bracket, BracketGenerator} from 'react-tournament-bracket';
import {ListOfProgress} from '../components/TournamentParts.js';
import {render} from 'react-dom';

const Tournament = ({tourn, games, full, tournamentPhrase}) => (
  <div>
    <h1>{full.tournamentTitle}</h1>
    <h3>Public Phrase: {full.tournamentPhrasePublic}</h3>
    <ShowWinner games={tourn} />
    <Bracket game={tourn} />
    <AddEditors phrase={tournamentPhrase} full={full} games={games} />
  </div>
  );

const AddEditors = ({phrase, full, games}) => {
  if (phrase === full.tournamentPhrasePrivate)
    return <ListOfProgress tourn={full} games={games} />
  else
    return null;
};

const ShowWinner = ({games}) => {
  if (games.winner && games.winner != "") {
    let name = "";
    if (games.sides.home.team.id === games.winner)
      name = games.sides.home.team.name;
    else
      name = games.sides.visitor.team.name;
    return <h1>{name} is the winner!</h1>
  }
  else
    return null;
};

export default Tournament
