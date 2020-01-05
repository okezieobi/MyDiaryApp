import React from 'react';
import Users from './components/users/index'
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Switch >
        <Route path='/users'>
          <Users />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
