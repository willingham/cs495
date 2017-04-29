import React from 'react';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { evalValueCounter, handleModifier } from '../../modules/evaluator.js';

const Modifier = (props) => {
    return <Button
                className="modifier-button"
                bsStyle="primary"
                onClick={props.handleClick}>{props.btnText}</Button>;
}

const Modifiers = (props) => {
  if (props.isPrivateGame)
    return (
        <div className="row modifier-buttons">
            { props.modifiers && props.modifiers.map((modifier, i) => {
                return <Modifier
                    btnText={modifier.btnText}
                    handleClick={handleModifier(modifier.code,
                                                props.value,
                                                props.updateInfo,
                                                props.updateCounter)}
                    key={i} />
              }) }
        </div>
    );
  else
    return null;
}

const PlayerCounter = (props) => {
    return (
        <div className="row">
            <div className="col-lg-3 col-xs-4 text-right"><h4>{props.counterName}</h4></div>
            <div className="col-lg-2 col-xs-2 text-left"><h4>{props.counterValue}</h4></div>
            <div className="col-lg-7 col-xs-6">
                <Modifiers
                    modifiers={props.modifiers}
                    value={props.counterValue}
                    updateInfo = {props.updateInfo}
                    updateCounter={props.updateCounter}
                    isPrivateGame={props.isPrivateGame} />
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
                             updateInfo={{
                                teamId: props.updateInfo.teamId,
                                playerId: props.updateInfo.playerId,
                                counterId: i,
                             }}
                             updateCounter={props.updateCounter}
                             isPrivateGame={props.isPrivateGame}
                />
              }) }
        </div>
    );
}

const PlayerEditButtons = (props) => {
  if (props.isPrivateGame)
    return (
      <div>
        <Button className="pull-right" onClick={ () => props.updatePlayerName(props.updateInfo.teamId, props.updateInfo.playerId, prompt("New Player Name", props.playerName)) }><i className="fa fa-pencil"></i></Button>
        <Button className="pull-right" onClick={ () => props.deletePlayer(props.updateInfo.teamId, props.updateInfo.playerId) }><i className="fa fa-trash"></i></Button>
      </div>
    );
  else return null;
}

const Player = (props) => {
    return (
        <div className="col-lg-12">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-lg-3">
                            { props.status &&
                                <h4>{ props.status }</h4>
                            }
                        </div>
                        <div className="col-lg-6">
                            <h4>{props.playerName}</h4>
                        </div>
                        <div className="col-lg-3">
                          <PlayerEditButtons
                            isPrivateGame={props.isPrivateGame}
                            updateInfo={props.updateInfo}
                            updatePlayerName={props.updatePlayerName}
                            deletePlayer={props.deletePlayer}
                            playerName={props.playerName} />
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <PlayerCounters
                        updateInfo = {props.updateInfo}
                        updateCounter={props.updateCounter}
                        counters={props.counters}
                        isPrivateGame={props.isPrivateGame}/>
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
                               status={player.status}
                               key={i}
                               updateInfo={{
                                  teamId: props.updateInfo.teamId,
                                  playerId: i,
                               }}
                               updateCounter={props.updateCounter}
                               updatePlayerName={props.updatePlayerName}
                               deletePlayer={props.deletePlayer}
                               isPrivateGame={props.isPrivateGame}
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
                    <h1>{evalValueCounter(props.code, props.team) || props.counterValue}</h1>
                </div>
                <div className="panel-footer">
                    <h4>{props.counterName}</h4>
                </div>
            </div>
            <Modifiers
                updateInfo = {props.updateInfo}
                updateCounter={props.updateCounter}
                value = {props.counterValue}
                modifiers={props.modifiers}
                isPrivateGame={props.isPrivateGame} />
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
                             code={counter.code}
                             team={props.team}
                             key={i}
                             updateInfo={{
                                teamId: props.updateInfo.teamId,
                                counterId: i,
                             }}
                             updateCounter={props.updateCounter}
                             isPrivateGame={props.isPrivateGame}
                />
              }) }
        </div>
    );
}

const EditTeamButton = (props) => {
  if (props.isPrivateGame)
    return (
      <Button className="pull-right" onClick={ () => props.updateTeamName(props.id, prompt("New Team Name", props.name)) }><i className="fa fa-pencil"></i></Button>
    );
  else
    return null;
};
const AddPlayerButton = (props) => {
  if (props.isPrivateGame)
    return (
      <Button onClick={ () => props.addPlayer(props.id, prompt('New Player Name')) }>+ Add Player</Button>
    );
  else
    return null;
}

const Team = (props) => {
    return(
        <div className="col-lg-6 team">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-lg-3">
                            { props.status &&
                                 <div>
                                    <h3>{props.status}</h3>
                                 </div>
                             }
                        </div>
                        <div className="col-lg-6">
                            <h2>{props.name}</h2>
                        </div>
                        <div className="col-lg-3">
                          <EditTeamButton
                            isPrivateGame={props.isPrivateGame}
                            updateTeamName={props.updateTeamName}
                            id={props.id}
                            name={props.name}
                          />
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <TeamCounters
                        updateInfo = {{teamId: props.id}}
                        updateCounter={props.updateTeamCounter}
                        team={props.team}
                        counters={props.counters}
                        isPrivateGame={props.isPrivateGame} />

                    <Players
                        updateInfo = {{teamId: props.id}}
                        updateCounter={props.updatePlayerCounter}
                        updatePlayerName={props.updatePlayerName}
                        deletePlayer={props.deletePlayer}
                        players={props.players}
                        isPrivateGame={props.isPrivateGame} />
                </div>
                <div className="panel-footer">
                  <AddPlayerButton
                    id={props.id}
                    isPrivateGame={props.isPrivateGame}
                    addPlayer={props.addPlayer}
                  />
                </div>
            </div>
        </div>
    )
}

export default Team;
