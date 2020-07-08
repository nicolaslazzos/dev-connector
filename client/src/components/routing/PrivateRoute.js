import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = props => {
  const { component: Component, auth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props => {
        return !auth.isAuthenticated && !auth.loading ? <Redirect to='/login' /> : <Component {...props} />
      }}
    />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(PrivateRoute);