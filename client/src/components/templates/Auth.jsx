import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  main: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Header({ headerAction, mainAction }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Diary
          </Typography>
          <Button color="inherit">{headerAction}</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.main}>
        {mainAction}
      </div>
    </div>
  );
}

Header.propTypes = {
  headerAction: PropTypes.string.isRequired,
  mainAction: PropTypes.string.isRequired,
};

export default Header;
