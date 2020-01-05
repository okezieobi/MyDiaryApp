import React from 'react';
import Signup from './signup';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import UserDashboard from './dashboard'

const Users = () =>
    <Router>
        <Switch>
            <Route path='/signup'>
                <Signup />
            </Route>
            <Route path='/dashboard'>
                <UserDashboard />
            </Route>
        </Switch>
    </Router>

export default Users;