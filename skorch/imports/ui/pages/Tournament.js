import React from 'react';
import {Bracket, BracketGenerator} from 'react-tournament-bracket';
import {ListOfProgress} from '../components/TournamentParts.js';
import {render} from 'react-dom';

const Tournament = ({tourn, games, full, tournamentPhrase}) => (
  <div>
    <h1>{full.tournamentTitle}</h1>
    <h3>Public Phrase: {full.tournamentPhrasePublic}</h3>
    <Bracket game={tourn} />
    <AddEditors phrase={tournamentPhrase} full={full} games={games} />
  </div>
  );

const AddEditors = ({phrase, full, games}) => {
  if (phrase === full.tournamentPhrasePrivate)
    return <ListOfProgress tourn={full} games={games} />
  else
    return null;
}
export default Tournament
