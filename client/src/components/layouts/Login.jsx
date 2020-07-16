import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../templates/Auth';
import Form from '../templates/Form';
import LoginBG from '../../svg/artOne.svg';

const useStyles = makeStyles(() => ({
  root: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundImage: `url(${LoginBG})`,
    backgroundPosition: 'center',
  },
}));

export default function () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Auth
        headerAction="Signup"
        mainAction={<Form />}
      />
    </div>
  );
}
