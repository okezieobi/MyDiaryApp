import React from 'react';
// import Signup from './components/users/signup';
import Home from './components/layouts/home';
// import Dashboard from './components/users/dashboard';
// import Signin from './components/users/signin';
// import logo from './logo.svg';
import {
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

export default () => {
  return (
    <Switch>

      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  );
}
