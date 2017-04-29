import React from 'react';
import { Nav, Navbar, Image, NavItem } from 'react-bootstrap';
import { Link} from 'react-router';
import PublicNavigation from './PublicNavigation.js';
import AuthenticatedNavigation from './AuthenticatedNavigation.js';

const renderNavigation = hasUser => (hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />);

const AppNavigation = ({ hasUser }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">
            <Image className="headerLogo" src="/favicon.png" rounded />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
    <Nav pullLeft>
        <NavItem eventKey={1} href="https://willingham.github.io/cs495/">Design Site</NavItem>
    </Nav>
      { renderNavigation(hasUser) }
    </Navbar.Collapse>
  </Navbar>
);

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};

export default AppNavigation;
