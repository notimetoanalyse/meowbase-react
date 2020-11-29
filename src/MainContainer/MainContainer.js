import React from 'react';
import Sidebar from '../Sidebar/Sidebar.js';
import Patients from '../Patients/Patients.js';
import TopPanel from '../TopPanel/TopPanel';
import { Route, Switch } from 'react-router';
import '../App.css';
import PatientPage from '../PatientPage/PatientPage';
import Settings from '../components/Settings/Settings';

const Main = () => {
  return (
    <>
      <div className="page_container">
        <div className="main_content_flex_wrapper">
          <Sidebar />
          <div className="non_sidebar_content">
            <TopPanel />
            <div class="main_section" id="main-section">
              <Switch>
                <Route exact path="/patient/:id" component={PatientPage} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/" component={Patients} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
