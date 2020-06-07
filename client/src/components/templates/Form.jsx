import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function FormFactory({ inputs }) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {
              inputs.map(({ id, label, variant }) => (
                <TextField id={id} label={label} variant={variant} />
              ))
          }
    </form>
  );
}

FormFactory.propTypes = {
  inputs: PropTypes.arrayOf.isRequired,
};
