import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions';

const Navbar = props => {
  const authLinks = (
    <ul>
      <li><a href="#!">Developers</a></li>
      <li>
        <a onClick={props.logout} href="#!">
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><a href="#!">Developers</a></li>
      <li><Link to='/register'>Register</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {!props.auth.loading && (props.auth.isAuthenticated ? authLinks : guestLinks)}
    </nav>
  )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

export default connect(mapStateToProps, { logout })(Navbar);