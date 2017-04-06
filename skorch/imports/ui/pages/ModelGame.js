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

const teams = [
    {
        name: "Alabama",
        counters: counters,
        players: players,
    },
    {
        name: "Auburn",
        counters: counters,
        players: players,
    },
];

const MModelGame = (props) => ( // top-level page for all games
    <div>
        <div className="row game-header-row">
            <div className="panel panel-green game-header-panel">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-lg-2">
                            <i className="fa fa-trophy fa-5x" />
                        </div>
                        <div className="col-lg-8"><h1>{ props.title }</h1></div>
                        <div className="col-lg-2">
                            <i className="fa fa-trophy fa-5x" />
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <span className="pull-left">Public Game Phrase: { props.publicGamePhrase }</span>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
        <div className="row">
            { props.teams.map((team, i) => {
                return <Team name={ team.name }
                             counters={ team.counters }
                             players={ team.players }
                             key={i} />
            })}
        </div>
    </div>
);

const ModelGame = () => {
    return <MModelGame title={ "The Iron Bowl" }
                publicGamePhrase = { "JubilantPrancingReigndeer" }
                privateGamePhrase = { "" }
                teams={ teams }
    />
}


export default ModelGame;
