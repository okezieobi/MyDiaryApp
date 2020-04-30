import React from 'react';
import Signup from './components/users/signup';
import Home from './components/users/home'
import Dashboard from './components/users/dashboard';
import Signin from './components/users/signin';
// import logo from './logo.svg';
import {
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <Switch>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/signin'>
        <Signin />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
