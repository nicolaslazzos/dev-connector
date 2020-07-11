import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';
import { getProfiles } from '../../actions';

const Profiles = props => {
  const { getProfiles, profile } = props;

  useEffect(() => { getProfiles() }, [getProfiles]);

  if (profile.loading) return <Spinner />;

  return (
    <React.Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      <div className="profiles">
        {Profiles.length ? profile.profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />) : <h4>There are no profiles...</h4>}
      </div>
    </React.Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return { profile: state.profile };
}

export default connect(mapStateToProps, { getProfiles })(Profiles);