import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions';

const Experience = props => {
  const experiences = props.experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">{exp.location}</td>
      <td className="hide-sm">
        <Moment format='DD/MM/YYYY'>{exp.from}</Moment>{' - '}
        {exp.current ? 'Now' : <Moment format='DD/MM/YYYY'>{exp.to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => props.deleteExperience(exp._id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Location</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </React.Fragment>
  );
};

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);