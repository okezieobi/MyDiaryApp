import React from 'react';
import Signup from './components/users/signup';
import Home from './components/users/home'
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
            <Route path='/'>
                <Home />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
