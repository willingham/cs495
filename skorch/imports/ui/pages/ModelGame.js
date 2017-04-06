import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeGame, gamePhraseType } from '../../api/games/methods.js';
import { addGameToUserAccount, gameExistsInUserAccount, removeGameFromUserAccount } from '../../api/user/methods.js';
import Team from  '../components/Team.js';

const scoreModifiers = [
    { btnText: "+1" },
    { btnText: "-1" },
    { btnText: "-1" },
    { btnText: "x2" }
];

const penaltyModifiers = [
    { btnText: "+1" },
    { btnText: "-1" },
];

const counters = [
    { 
        value: 10,
        name: "score",
        modifiers: scoreModifiers,
    },
    { 
        value: 3,
        name: "penalty",
        modifiers: penaltyModifiers,
    },
];

const players = [
    {
        name: "Thomas",
        counters: counters,
    },
    {
        name: "Nath",
        counters: counters,
    },
    {
        name: "Cody",
        counters: counters,
    },
    {
        name: "Will",
        counters: counters,
    },
];

const ModelGame = () => ( // top-level page for all games
    <div className="row">
        <Team name={ "Alabama" } counters={ counters } players={ players } />
        <Team name={ "Auburn" } counters={ counters } players={ players } />
    </div>
);


export default ModelGame;
