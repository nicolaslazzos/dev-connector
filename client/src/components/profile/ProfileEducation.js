import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileEducation = props => {
  const { school, degree, fieldofstudy, from, to, current, description } = props.education;

  return (
    <div>
      <h3 class="text-dark">{school}</h3>
      <p><Moment format='DD/MM/YYY'>{from}</Moment> - {current ? 'Now' : <Moment format='DD/MM/YYY'>{to}</Moment>}</p>
      <p><strong>Degree: </strong>{`${degree}${fieldofstudy ? ` in ${fieldofstudy}` : ''}`}</p>
      <p>
        <strong>Description: </strong>{description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
}

export default ProfileEducation;