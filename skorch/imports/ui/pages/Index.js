import React from 'react';
import { Jumbotron, Button, Form, InputGroup, FormGroup, FormControl } from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

class JoinGame extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state = { gamePhrase: '' };
    }
    handleUpdate(e) {
        this.setState({ gamePhrase: e.target.value });
    }
    render() {
        return (
            <div className="homeNewJoinGame">
                <Form inline>
                    <FormGroup>
                        <FormControl
                            type="text"
                            value={ this.state.gamePhrase }
                            placeholder="Enter Game Phrase"
                            onChange={ this.handleUpdate }
                            className="txtbx-enterGamePhrase"
                        />
                            <Link to={'/game/' + this.state.gamePhrase }><Button bsStyle="primary" bsSize="large">Join Game</Button></Link>
                            <Button bsSize="large" onClick={this.props.closeJoin}><span>&times;</span></Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

class JoinTournament extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state = { gamePhrase: '' };
    }
    handleUpdate(e) {
        this.setState({ gamePhrase: e.target.value });
    }
    render() {
        return (
            <div className="homeNewJoinGame">
                <Form inline>
                    <FormGroup>
                        <FormControl
                            type="text"
                            value={ this.state.tournamentPhrase }
                            placeholder="Enter Tournament Phrase"
                            onChange={ this.handleUpdate }
                            className="txtbx-enterTournamentPhrase"
                        />
                            <Link to={'/tournament/' + this.state.tournamentPhrase }><Button bsStyle="primary" bsSize="large">Join Tournament</Button></Link>
                            <Button bsSize="large" onClick={this.props.closeJoin}><span>&times;</span></Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

const TournamentButtons = (props) => (
    <div className="homeNewJoinTournament">
        <Link to="/tournament/new">
            <Button bsStyle="success" bsSize="large">New Tournament</Button>
        </Link>
        <Button bsStyle="primary" bsSize="large" onClick={props.onJoin}>Join Tournament</Button>
    </div>
);

const GameButtons = (props) => (
    <div className="homeNewJoinGame">
        <Link to="/game/new">
            <Button bsStyle="success" bsSize="large">New Game</Button>
        </Link>
        <Button bsStyle="primary" bsSize="large" onClick={props.onJoin}>Join Game</Button>
    </div>
);

class NewJoinTournament extends React.Component {
    constructor() {
        super();

        this.swapChild = this.swapChild.bind(this);
        this.closeJoin = this.closeJoin.bind(this);
 
        this.state = { child: <TournamentButtons onJoin={this.swapChild} /> };
    }
    swapChild() {
        this.setState({ child : <JoinTournament closeJoin={this.closeJoin} /> });
    }
    closeJoin() {
        this.setState({ child : <TournamentButtons onJoin={this.swapChild} /> });
    }
    render() {
        return this.state.child;
    }
}

class NewJoinGame extends React.Component {
    constructor() {
        super();

        this.swapChild = this.swapChild.bind(this);
        this.closeJoin = this.closeJoin.bind(this);
 
        this.state = { child: <GameButtons onJoin={this.swapChild} /> };
    }
    swapChild() {
        this.setState({ child : <JoinGame closeJoin={this.closeJoin} /> });
    }
    closeJoin() {
        this.setState({ child : <GameButtons onJoin={this.swapChild} /> });
    }
    render() {
        return this.state.child;
    }
}

class Index extends React.Component {
	constructor() {
        super();
		var images=['img/track.jpg',
					'img/chess.jpg',
					'img/waterBalloons.jpg',
					'img/tennis.jpg',
					'img/scrabble.jpg',
					'img/golf.jpg',
					'img/basketball.jpg',
					'img/cycling.jpg',
					'img/fooseball.jpg',
					'img/baseball.jpg',];
        var randomNumber = Math.floor(Math.random() * images.length);
		var bgImg = 'url(' + images[randomNumber] + ') no-repeat top center fixed';
        this.state = { bg: bgImg };
    }

    componentDidMount() {
		document.getElementById('backg').style.background = this.state.bg;
		document.getElementById('backg').style.backgroundSize = "cover";
    }

    render() {
        return (
          <div>
              <div id="backg"></div>
              <div className="Index">
                <div className="inner cover">
                  <img src="/skorch-logo.png" width="40%"/>
                  <p className="lead">A skorekeeping app for everything!</p>
                  <NewJoinGame />
                  <NewJoinTournament />
                </div>
              </div>
          </div>
        );
    }
}




export default Index;
