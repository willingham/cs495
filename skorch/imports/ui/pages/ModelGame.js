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

const teamAlabamaCounters = [
    { 
        value: 4,
        name: "points",
        modifiers: penaltyModifiers,
    },
    { 
        value: 0,
        name: "flags",
        modifiers: penaltyModifiers,
    },
];

const teamAuburnCounters = [
    { 
        value: 1,
        name: "points",
        modifiers: penaltyModifiers,
    },
    { 
        value: 2,
        name: "flags",
        modifiers: penaltyModifiers,
    },
];

const alabamaCounters = [
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

const auburnCounters = [
    { 
        value: 3,
        name: "score",
        modifiers: scoreModifiers,
    },
    { 
        value: 10,
        name: "penalty",
        modifiers: penaltyModifiers,
    },
];

const alabamaPlayers = [
    {
        name: "Thomas",
        counters: alabamaCounters,
    },
    {
        name: "Nath",
        counters: alabamaCounters,
    },
    {
        name: "Cody",
        counters: alabamaCounters,
    },
    {
        name: "Will",
        counters: alabamaCounters,
    },
];

const auburnPlayers = [
    {
        name: "Jim",
        counters: auburnCounters,
    },
    {
        name: "Dale",
        counters: auburnCounters,
    },
    {
        name: "Hank",
        counters: auburnCounters,
    },
    {
        name: "Rob",
        counters: auburnCounters,
    },
];

const teams = [
    {
        name: "Alabama",
        counters: teamAlabamaCounters,
        players: alabamaPlayers,
    },
    {
        name: "Auburn",
        counters: teamAuburnCounters,
        players: auburnPlayers,
    },
];

class MModelGame extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            teams: this.props.teams,
        };
        this.addPlayer = this.addPlayer.bind(this);
    }

    addPlayer(id, name) {
        let teams = this.state.teams.slice();
        if (teams[id].name === "Alabama") {
            count = alabamaCounters;
        } else { 
            count = auburnCounters;
        }
        teams[id].players.push({ name: name, counters: count });
        this.setState({ teams: teams });
    }

    render() {
        return (
            <div>
                <div className="row game-header-row">
                    <div className="panel panel-green game-header-panel">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-lg-2">
                                    <i className="fa fa-trophy fa-5x" />
                                </div>
                                <div className="col-lg-8"><h1>{ this.state.title }</h1></div>
                                <div className="col-lg-2">
                                    <i className="fa fa-trophy fa-5x" />
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer">
                            <span className="pull-left">Public Game Phrase: { this.props.publicGamePhrase }</span>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    { this.state.teams.map((team, i) => {
                        return <Team name={ team.name }
                                     counters={ team.counters }
                                     players={ team.players }
                                     addPlayer={ this.addPlayer }
                                     key={i} 
                                     id={i} />
                    })}
                </div>
            </div>
        );
    }
}

const ModelGame = () => {
    return <MModelGame title={ "The Iron Bowl" }
                publicGamePhrase = { "JubilantPrancingReigndeer" }
                privateGamePhrase = { "" }
                teams={ teams }
    />
}


export default ModelGame;
