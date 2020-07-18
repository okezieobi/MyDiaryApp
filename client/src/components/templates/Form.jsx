import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function FormFactory({ inputs, buttons }) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        {
          inputs.map(({ id, label, variant }) => (
            <TextField id={id} label={label} variant={variant} />
          ))
        }
      </div>
      <ButtonGroup>
        {
          buttons.map(({ id, text }) => (
            <Button id={id}>{text}</Button>
          ))
        }
      </ButtonGroup>
    </form>
  );
}

FormFactory.propTypes = {
  inputs: PropTypes.arrayOf.isRequired,
  buttons: PropTypes.arrayOf.isRequired,
};

export default FormFactory;
