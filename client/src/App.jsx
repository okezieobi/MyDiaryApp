import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/layouts/dashboard';

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/" />
      </Switch>
    </>
  );
}
