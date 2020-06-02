import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/layouts/Dashboard';
import Home from './components/layouts/Home';

export default function () {
  return (
    <>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}
