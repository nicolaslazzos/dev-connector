import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions';

const Profile = props => {
  const { getProfileById, match, profile: { loading, profile }, auth } = props;

  useEffect(() => { getProfileById(match.params.id) }, [getProfileById, match.params.id]);

  if (loading || !profile) return <Spinner />;

  return (
    <React.Fragment>
      <Link to="/profiles" className="btn btn-light">Back to Profiles</Link>
      {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        {!!profile.experience.length && (
          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {profile.experience.map(exp => <ProfileExperience key={exp._id} experience={exp} />)}
          </div>
        )}
        {!!profile.education.length && (
          <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {profile.education.map(edu => <ProfileEducation key={edu._id} education={edu} />)}
          </div>
        )}
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </div>
    </React.Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return { profile: state.profile, auth: state.auth };
}

export default connect(mapStateToProps, { getProfileById })(Profile);