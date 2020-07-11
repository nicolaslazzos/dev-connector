import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardsActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions';

const Dashboard = props => {
  const { profile: { profile, loading }, auth: { user }, getCurrentProfile } = props;

  useEffect(() => { getCurrentProfile() }, [getCurrentProfile]);

  if (loading && !profile) return <Spinner />;

  return (
    <React.Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className="lead"><i className='fas fa-user'></i> Welcome {user && user.name}</p>
      {profile ? (
        <React.Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={props.deleteAccount}>
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </React.Fragment>
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
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return { profile: state.profile, auth: state.auth };
}

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);