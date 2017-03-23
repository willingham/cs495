import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <img src="/skorch-t72.png" width="40%"/>
      <p>A skorekeeping app for everything!</p>
      <p><a className="btn btn-success" href="#" role="button">New Game</a>  <a className="btn btn-primary" href="#" role="button">Join Game</a></p>
    </Jumbotron>
  </div>
);

export default Index;
