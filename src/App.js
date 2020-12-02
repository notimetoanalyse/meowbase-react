import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './Dashboard/Dashboard';
import AuthProvider from './context/AuthContext';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import { db } from './firebase';
import { usePatientsContext } from './context/PatientsContext';

function parsePatientFromSnapshot(snapshot) {
  let json = snapshot.data();

  if (typeof json['name'] !== 'string' || json['name'] === '') {
    console.info(`Invalid name on patient ${snapshot.id}`);
    return null;
  }

  if (typeof json['image'] !== 'string' || json['image'] === '') {
    console.info(`Invalid image on patient ${snapshot.id}`);
    return null;
  }

  if (typeof json['observations'] !== 'string' || json['observations'] === '') {
    console.info(`Invalid observations on patient ${snapshot.id}`);
    return null;
  }

  if (!Array.isArray(json['tags'])) {
    console.info(`Invalid tags on patient ${snapshot.id}`);
    return null;
  }

  if (json['status'] == 'invisible') {
    return null;
  }
  json['id'] = snapshot.id;
  return json;
}

function App() {
  const [{ patients }, dispatch] = usePatientsContext();

  // populate state with data
  useEffect(() => {
    let isMounted = true;
    async function fetchPatients() {
      const data = await db.collection('patients').get();

      const allPatients = data.docs.map(patientSnapshot =>
        parsePatientFromSnapshot(patientSnapshot)
      );

      const filteredPatients = allPatients.filter(patient => patient !== null);
      if (isMounted)
        dispatch({ type: 'SET_PATIENTS', patients: filteredPatients });
    }
    fetchPatients();

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
