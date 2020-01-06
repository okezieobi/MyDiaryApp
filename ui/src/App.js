import React from 'react';
import Signup from './components/users/signup';
import UserDashboard from './components/users/dashboard';
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

const App = () => {
  return (
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
  );
}

export default App;
