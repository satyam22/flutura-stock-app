import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import Stock from './components/Dashboard/Stock';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/dashboard' component = {Dashboard} />
        <Route exact path='/dashboard/:symbol' component = {Stock} />
        <Route path='/signin' component = {SignIn} />
      </Switch>
    );
  }
}

export default App;
