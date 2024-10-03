import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const CheckmarkIcon = ({ isDoctor }) => {
  return (
    isDoctor ? (
      <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '8px' }} />
    ) : null
  );
};

CheckmarkIcon.propTypes = {
  isDoctor: PropTypes.bool.isRequired,
};

export default CheckmarkIcon;
