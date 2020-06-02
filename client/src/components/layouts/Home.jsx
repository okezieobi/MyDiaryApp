import React from 'react';
import Auth from '../templates/Auth';
import { makeStyles } from '@material-ui/core/styles';
import homeBG from '../../svg/undraw_Bibliophile_hwqc.svg';

const useStyles = makeStyles(() => ({
    root: {
        backgroundImage: `url(${homeBG})`
    }
}))

export default function () {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Auth headerAction='Login' />
        </div>
    )
}