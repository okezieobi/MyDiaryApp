import React from 'react';
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { BookOutlined } from '@material-ui/icons';

export default () => <div className='' >
    <AppBar>
        <Toolbar>
            <Typography>
                <BookOutlined /> My Diary
            </Typography>
            <Button component={Link} to='/signin' >
                <Typography>Signin</Typography>
            </Button>
        </Toolbar>
    </AppBar>
</div>
