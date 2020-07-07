import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alert = props => {
  if (!props.alerts || !props.alerts.length) return null;

  return props.alerts.map(alert => <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>);
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return { alerts: state.alert };
}

export default connect(mapStateToProps, null)(Alert);