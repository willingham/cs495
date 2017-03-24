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
                            <Link to={'/game/' + this.state.gamePhrase }><Button bsStyle="primary">Join Game</Button></Link>
                            <Button onClick={this.props.closeJoin}><span>&times;</span></Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}


const Buttons = (props) => (
    <div className="homeNewJoinGame">
        <Link to="/games/new">
            <Button bsStyle="success">New Game</Button>
        </Link>
        <Button bsStyle="primary" onClick={props.onJoin}>Join Game</Button>
    </div>
);

class NewJoinGame extends React.Component {
    constructor() {
        super();

        this.swapChild = this.swapChild.bind(this);
        this.closeJoin = this.closeJoin.bind(this);
 
        this.state = { child: <Buttons onJoin={this.swapChild} /> };
    }
    swapChild() {
        this.setState({ child : <JoinGame closeJoin={this.closeJoin} /> });
    }
    closeJoin() {
        this.setState({ child : <Buttons onJoin={this.swapChild} /> });
    }
    render() {
        return this.state.child;
    }
}

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <img src="/skorch-t72.png" width="40%"/>
      <p>A skorekeeping app for everything!</p>
      <NewJoinGame />
    </Jumbotron>
  </div>
);

export default Index;
