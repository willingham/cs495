import React from 'react';
import {Bracket, BracketGenerator} from 'react-tournament-bracket';
import {ListOfProgress} from '../components/TournamentParts.js';
import {render} from 'react-dom';

const Tournament = ({tourn, games, full}) => (
  <div>
    <Bracket game={tourn} />
    <ListOfProgress tourn={full} games={games} />
  </div>
  );

export default Tournament
