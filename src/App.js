import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './Dashboard/Dashboard';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
}

export default App;
