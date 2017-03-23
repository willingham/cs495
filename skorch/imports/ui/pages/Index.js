import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <img src="/skorch-t72.png" width="40%"/>
      <p>A skorekeeping app for everything!</p>
      <p><Link to="/games/new"><Button bsStyle="success">New Game</Button></Link>  <a className="btn btn-primary" href="#" role="button">Join Game</a></p>
    </Jumbotron>
  </div>
);

export default Index;
