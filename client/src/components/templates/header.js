import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { BookOutlined } from '@material-ui/icons';

export default () => <div className='' >
    <AppBar position='static' >
        <Toolbar>
            <Typography variant='h1'>
                <BookOutlined /> My Diary
            </Typography>
            <Button className='home-title-button' href='/signin' >
                <Typography variant='h4' >Signin</Typography>
            </Button>
        </Toolbar>
    </AppBar>
</div>
