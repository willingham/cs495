import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertGame, removeGame, gamePhraseType } from '../../api/games/methods.js';
import { addGameToUserAccount, gameExistsInUserAccount, removeGameFromUserAccount } from '../../api/user/methods.js';
import Team from  '../components/Team.js';
import { evalCondition } from '../../modules/evaluator.js';

class ModelGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.game.id,
            title: this.props.game.title,
            publicGamePhrase: this.props.game.publicGamePhrase,
            privateGamePhrase: this.props.game.privateGamePhrase,
            modelName: this.props.game.modelName,
            teams: this.props.game.teams,
            playerConditions: this.props.game.playerConditions,
            playerCounters: this.props.game.playerCounters,
            isPrivate: (this.props.game.pagePhrase === this.props.game.privateGamePhrase)
        };
        this.addPlayer = this.addPlayer.bind(this);
        this.updatePlayerCounter = this.updatePlayerCounter.bind(this);
        this.updateTeamCounter = this.updateTeamCounter.bind(this);
        this.updateTeamName = this.updateTeamName.bind(this);
        this.updatePlayerName = this.updatePlayerName.bind(this);
        this.deletePlayer = this.deletePlayer.bind(this);
        this.displayPrivateGamePhrase = this.displayPrivateGamePhrase.bind(this);
    }

    componentWillMount() {
        this.evalConditions();
    }

    addPlayer(id, name) {
        let teams = this.state.teams.slice();
        teams[id].players.push({
            name: name,
            counters: JSON.parse(JSON.stringify(this.state.playerCounters)),
            conditions: JSON.parse(JSON.stringify(this.state.playerConditions)),
        });
        const upsert = {
            _id: this.state.id,
            teams: teams,
        };
        upsertGame.call(upsert, (error, response) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                Bert.alert("Player added!", 'success');
            }
        });
    }

    updatePlayerCounter(info, value) {
        let teams = this.state.teams.slice();
        teams[info.teamId].players[info.playerId].counters[info.counterId].value = value;
        const upsert = {
            _id: this.state.id,
            teams: teams
        };
        upsertGame.call(upsert, (error, response) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            }
        });
    }

    updateTeamCounter(info, value) {
        let teams = this.state.teams.slice();
        teams[info.teamId].counters[info.counterId].value = value;
        const upsert = {
            _id: this.state.id,
            teams: teams
        };
        upsertGame.call(upsert, (error, response) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            }
        });
    }

    updateTeamName(teamId, name) {
        let teams = this.state.teams.slice();
        teams[teamId].name = name;
        const upsert = {
            _id: this.state.id,
            teams: teams
        }
        upsertGame.call(upsert, (error, response) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            }
        });
    }

    updatePlayerName(teamId, playerId, name) {
        let teams = this.state.teams.slice();
        teams[teamId].players[playerId].name = name;
        const upsert = {
            _id: this.state.id,
            teams: teams
        }
        upsertGame.call(upsert, (error, response) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            }
        });
    }

    deletePlayer(teamId, playerId) {
        let teams = this.state.teams.slice();
        teams[teamId].players.splice(playerId, 1);
        const upsert = {
            _id: this.state.id,
            teams: teams
        }
        upsertGame.call(upsert, (error, response) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            }
        });
    }

    displayPrivateGamePhrase() {
        if (this.state.isPrivate) {
            return "Private Game Phrase: " + this.state.privateGamePhrase;
        } else {
            return "";
        }
    }

    evalConditions() {
        let teams = this.state.teams.slice();

        teams.forEach((team) => {
            team.conditions.forEach((condition) => {
                team.status = evalCondition(condition, team);
            });

            team.players.forEach((player) => {
                player.conditions.forEach((condition) => {
                    player.status = evalCondition(condition, player);
                });
            });
        });

        this.setState({ teams: teams });
    }

    render() {
        return (
            <div>
                <div className="row game-header-row">
                    <div className="panel panel-green game-header-panel">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-lg-12"><h1>{ this.props.game.title }</h1></div>
                            </div>
                        </div>
                        <div className="panel-footer">
                            <div className="row">
                                <div className="col-lg-6">
                                    <span className="pull-left">Public Game Phrase: { this.props.game.publicGamePhrase }</span>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="clearfix"></div>
                                    <span className="pull-right">{ this.displayPrivateGamePhrase() }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    { this.props.game.teams.map((team, i) => {
                        return <Team name={ team.name }
                                     counters={ team.counters }
                                     players={ team.players }
                                     team={team}
                                     addPlayer={ this.addPlayer }
                                     updatePlayerCounter = { this.updatePlayerCounter }
                                     updateTeamCounter = { this.updateTeamCounter }
                                     updateTeamName={ this.updateTeamName }
                                     updatePlayerName={ this.updatePlayerName }
                                     deletePlayer={ this.deletePlayer }
                                     isPrivateGame={ this.state.isPrivate }
                                     status={ team.status }
                                     key={i}
                                     id={i} />
                    })}
                </div>
            </div>
        );
    }
}

const oldModelGame = (props) => {
    return <MModelGame title={ "The Iron Bowl" }
                publicGamePhrase = { "JubilantPrancingReigndeer" }
                privateGamePhrase = { "" }
                teams={ teams }
    />
}


export default ModelGame;
