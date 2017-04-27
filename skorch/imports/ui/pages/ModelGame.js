import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertGame, removeGame, gamePhraseType } from '../../api/games/methods.js';
import { addGameToUserAccount, gameExistsInUserAccount, removeGameFromUserAccount } from '../../api/user/methods.js';
import Team from  '../components/Team.js';


class ModelGame extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            publicGamePhrase: this.props.publicGamePhrase,
            privateGamePhrase: this.props.privateGamePhrase,
            modelName: this.props.modelName,
            teams: this.props.teams,
            playerConditions: this.props.playerConditions,
            playerCounters: this.props.playerCounters
        };
        this.addPlayer = this.addPlayer.bind(this);
    }

    addPlayer(id, name) {
        let teams = this.state.teams.slice();
        teams[id].players.push({
            name: name,
            counters: JSON.parse(JSON.stringify(this.state.playerCounters)),
            conditions: JSON.parse(JSON.stringify(this.state.playerConditions)),
        });
        // this.setState({ teams: teams });
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

const oldModelGame = (props) => {
    return <MModelGame title={ "The Iron Bowl" }
                publicGamePhrase = { "JubilantPrancingReigndeer" }
                privateGamePhrase = { "" }
                teams={ teams }
    />
}


export default ModelGame;
