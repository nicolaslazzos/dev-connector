import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions';
import Spinner from '../layout/Spinner';

const Dashboard = props => {
  useEffect(() => { props.getCurrentProfile() }, []);

  const { profile: { profile, loading }, auth: { user } } = props;

  return loading && !profile ? <Spinner /> : (
    <React.Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className="lead"><i className='fas fa-user'></i> Welcome {user && user.name}</p>
      {profile ? (
        <React.Fragment>has</React.Fragment>
      ) : (
          <React.Fragment>
            <p>You have not yet setup a profile, please add some info.</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
          </React.Fragment>
        )}
    </React.Fragment>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return { profile: state.profile, auth: state.auth };
}

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);