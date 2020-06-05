import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../templates/Auth';
import homeBG from '../../svg/artOne.svg';

const useStyles = makeStyles(() => ({
  root: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'fit',
    height: '100%',
    backgroundImage: `url(${homeBG})`,
    flexGrow: 1,
  },
}));

export default function () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Auth headerAction="Login" />
    </div>
  );
}
