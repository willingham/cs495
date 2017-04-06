import React from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

const Modifier = (props) => {
    return <Button className="modifier-button" bsStyle="primary">{props.btnText}</Button>;
}

const Modifiers = (props) => {
    return (
        <div className="row modifier-buttons">
            { props.modifiers.map((modifier, i) => {
                return <Modifier btnText={modifier.btnText} key={i} />
              }) }
        </div>
    )
}

const PlayerCounter = (props) => {
    return (
        <div className="row">
            <div className="col-lg-3 text-right"><h4>{props.counterName}</h4></div>
            <div className="col-lg-2 text-left"><h4>{props.counterValue}</h4></div>
            <div className="col-lg-7"><Modifiers modifiers={props.modifiers} /></div>
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
                />
              }) }
        </div>
    );
}

const Player = (props) => {
    return (
        <div className="col-lg-12">
            <div className="panel panel-info">
                <div className="panel-heading"><h4>{props.playerName}</h4></div>
                <div className="panel-body">
                    <PlayerCounters counters={props.counters} />
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
                    <h1>{props.name}</h1>
                </div>
                <div className="panel-body">
                    <TeamCounters counters={props.counters} />
                    
                    <Players players={props.players} />
                </div>
                <div className="panel-footer">
                    <Button>+ Add Player</Button>
                </div>
            </div>
        </div>
    )
}

export default Team;
