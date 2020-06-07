import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Auth from '../templates/Auth';
import homeBG from '../../svg/artOne.svg';

const useStyles = makeStyles(() => ({
  root: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundImage: `url(${homeBG})`,
    backgroundPosition: 'center',
  },
  home: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '50%',
  },
  homeBtn: {
    width: '30%',
  },
  homeGreeting: {
    color: 'green',
  },
}));

export default function () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Auth
        headerAction="Login"
        mainAction={(
          <div className={classes.home}>
            <Typography variant="h6">
              Welcome to My Diary.
              A secure, reliable way to store your thoughts
            </Typography>
            <Button className={classes.homeBtn} variant="contained" color="primary">Signup</Button>
          </div>
        )}
      />
    </div>
  );
}
