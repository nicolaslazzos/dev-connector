import React from 'react';
import spinner from '../../img/spinner.gif';

const Spinner = () => {
  return (
    <React.Fragment>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </React.Fragment>
  )
};

export default Spinner;