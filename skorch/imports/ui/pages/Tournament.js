import React from 'react';
import {Bracket, BracketGenerator} from 'react-tournament-bracket';
import {render} from 'react-dom';

const Tournament = ({tourn}) => (
  <div>
    <Bracket game={tourn} />
  </div>
);

export default Tournament
