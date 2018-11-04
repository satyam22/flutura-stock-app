import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect to = '/dashboard' />
      </Switch>
    );
  }
}

export default App;
