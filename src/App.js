import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import {auth} from './firebase';
import {setCurrentUser, showAuthLoader, hideAuthLoader} from './redux/actions'
import Login from './components/Login/Login';
import Loader from './components/Loader/Loader'
import Signup from './components/Signup/Signup';
import Dashboard from './Dashboard/Dashboard';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import {useDispatch, useSelector} from 'react-redux'

function App() {
    const dispatch = useDispatch();
    const {loading, currentUser} = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(showAuthLoader())
        const unsubscribe = auth.onAuthStateChanged(user => {
            dispatch(setCurrentUser(user));
            dispatch(hideAuthLoader())
        });

        return unsubscribe;
    }, [])

    // if(loading && !currentUser) {
    //   return <Loader/>
    // }

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
