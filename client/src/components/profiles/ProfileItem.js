import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = props => {
  const { user: { _id, name, avatar }, status, company, location, skills } = props.profile;

  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} alt="User avatar" />
      <div>
        <h2>{name}</h2>
        <p>{status}{company && <span> at {company}</span>}</p>
        {location && <p className="my-1">{location}</p>}
        <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li className="text-primary" key={index}>
            <i className="fas fa-check" />{` ${skill}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem;