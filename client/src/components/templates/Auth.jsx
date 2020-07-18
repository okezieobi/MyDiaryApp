import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, Container,
} from '@material-ui/core';
import BtnLink from './BtnLink';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  main: {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function Auth({ headerAction, mainAction }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Diary
          </Typography>
          <BtnLink to={`/${headerAction}`} btnTxt={headerAction} />
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>
        {mainAction}
      </Container>
    </div>
  );
}

Auth.propTypes = {
  headerAction: PropTypes.string.isRequired,
  mainAction: PropTypes.element.isRequired,
};

export default Auth;
