import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../templates/Auth.jsx';
import homeBG from '../../svg/undraw_onboarding_o8mv.svg';

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${homeBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'fit',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    height: '100%',
  },
}));

export default function () {
  const classes = useStyles();

  return (
        <div className={classes.root} >
            <Auth headerAction='Login' />
        </div>
  );
}
