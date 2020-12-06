import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './Dashboard/Dashboard';
import AuthProvider from './context/AuthContext';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients } from './redux/actions'

function App() {
  const dispatch = useDispatch();

  // populate state with data
  useEffect(() => {
    let isMounted = true;
    if (isMounted)
      dispatch(fetchPatients())
    // clean up after unmounting
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Switch>
      <AuthProvider>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/" component={Dashboard} />
      </AuthProvider>
    </Switch>
  );
}

export default App;
