import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import MyGamesList  from '../containers/MyGamesList.js';

const MyGames = () => (
  <div className="Games">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">Saved Games</h4>
          <Link to="/games/new">
            <Button
              bsStyle="success"
              className="pull-right"
            >New Game</Button>
          </Link>
        </div>
        <MyGamesList />
      </Col>
    </Row>
  </div>
);

export default MyGames;
