import React from 'react';
import './App.css';
import Patients from './Patients/Patients';
import PatientPage from './PatientPage/PatientPage';
import Aside from './Sidebar/Sidebar';
import Main from './MainContainer/MainContainer';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <React.Fragment>
      <Main />
    </React.Fragment>
  );
}

export default App;
