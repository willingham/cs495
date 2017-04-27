import React from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

const handleModifier = (code, teamId, playerId, counterId, value, update) => {
    return () => {
        const toEval = "(function() { return " + code + ";})"
        const fn = eval(toEval).bind({value: value});
        update(teamId, playerId, counterId, fn());
    };
}

const Modifier = (props) => {
    return <Button 
                className="modifier-button"
                bsStyle="primary" 
                onClick={props.handleClick}>{props.btnText}</Button>;
}

const Modifiers = (props) => {
    return (
        <div className="row modifier-buttons">
            { props.modifiers && props.modifiers.map((modifier, i) => {
                return <Modifier 
                    btnText={modifier.btnText}
                    handleClick={handleModifier(modifier.code, 
                                                props.teamId,
                                                props.playerId,
                                                props.counterId,
                                                props.value,
                                                props.updateCounter)}
                    key={i} />
              }) }
        </div>
    )
}

const PlayerCounter = (props) => {
    return (
        <div className="row">
            <div className="col-lg-3 col-xs-4 text-right"><h4>{props.counterName}</h4></div>
            <div className="col-lg-2 col-xs-2 text-left"><h4>{props.counterValue}</h4></div>
            <div className="col-lg-7 col-xs-6">
                <Modifiers
                    modifiers={props.modifiers}
                    teamId={props.teamId}
                    playerId={props.playerId}
                    counterId={props.counterId}
                    updateCounter={props.updateCounter}
                    value={props.counterValue}/>
            </div>
        </div>
    );
}

const PlayerCounters = (props) => {
    return (
        <div className="row">
            { props.counters.map((counter, i) => {
                return <PlayerCounter counterValue={counter.value}
                             counterName={counter.name}
                             modifiers={counter.modifiers}
                             key={i}
                             teamId={props.teamId}
                             playerId={props.playerId}
                             counterId={i}
                             updateCounter={props.updateCounter}
                />
              }) }
        </div>
    );
}

const Player = (props) => {
    return (
        <div className="col-lg-12">
            <div className="panel panel-info">
                <div className="panel-heading"><h4 onClick={ () => props.updatePlayerName(props.teamId, props.playerId, prompt("New Player Name")) }>{props.playerName}</h4></div>
                <div className="panel-body">
                    <PlayerCounters 
                        teamId={props.teamId} 
                        playerId={props.playerId}
                        updateCounter={props.updateCounter}
                        counters={props.counters} />
                </div>
            </div>
        </div>
    );
};

const Players = (props) => {
    return (
        <div className="row">
            { props.players.map((player, i) => {
                return <Player playerName={player.name}
                               counters={player.counters}
                               key={i}
                               playerId={i}
                               updateCounter={props.updateCounter}
                               updatePlayerName={props.updatePlayerName}
                               teamId={props.teamId}
                       />;
              }) }
        </div>
    );
};

const TeamCounter = (props) => {
    return (
        <div className="col-lg-4 team-counter">
            <div className="panel panel-default">
                <div className="panel-body center">
                    <h1>{props.counterValue}</h1>
                </div>
                <div className="panel-footer">
                    <h4>{props.counterName}</h4>
                </div>
            </div>
            <Modifiers modifiers={props.modifiers} />
        </div>
    );
}

const TeamCounters = (props) => {
    return (
        <div className="row team-counters">
            { props.counters.map((counter, i) => {
                return <TeamCounter counterValue={counter.value}
                             counterName={counter.name}
                             modifiers={counter.modifiers}
                             key={i}
                />
              }) }
        </div>
    );
}

const Team = (props) => {
    return(
        <div className="col-lg-6 team">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h2 onClick={ () => props.updateTeamName(props.id, prompt("New Team Name")) }>{props.name}</h2>
                </div>
                <div className="panel-body">
                    <TeamCounters counters={props.counters} />
                    
                    <Players 
                        teamId={props.id}
                        updateCounter={props.updatePlayerCounter}
                        updatePlayerName={props.updatePlayerName}
                        players={props.players} />
                </div>
                <div className="panel-footer">
                    <Button onClick={ () => props.addPlayer(props.id, prompt('New Player Name')) }>+ Add Player</Button>
                </div>
            </div>
        </div>
    )
}

export default Team;
