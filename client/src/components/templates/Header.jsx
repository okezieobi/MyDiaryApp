import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { BookOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

export default ({ btnText }) => {
    const { root, title } = useStyles();

    return (
        <div className={root}>
            <AppBar position='static' >
                <Toolbar >
                    <IconButton edge='start' color='inherit' aria-label='menu' >
                        <BookOutlined />
                    </IconButton>
                    <Typography variant='h6' className={title} >My Diary</Typography>
                    <Button color='inherit' >{btnText}</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}