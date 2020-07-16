import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router, Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

const ButtonLink = ({
  btnTxt, variant, color, to, className,
}) => (
  <Router>
    <Button className={className} variant={variant} color={color} component={RouterLink} to={to}>
      {btnTxt}
    </Button>
  </Router>
);

ButtonLink.propTypes = {
  btnTxt: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.objectOf.isRequired,
};

export default ButtonLink;
