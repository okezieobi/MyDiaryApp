import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/layouts/Dashboard';
import Home from './components/layouts/Home';
import Login from './components/layouts/Login'

export default function () {
  return (
    <>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}
