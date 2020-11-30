import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import reducer, { initialState } from './reducer';
import { PatientsProvider } from './context/PatientsContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PatientsProvider initialState={initialState} reducer={reducer}>
        <App />
      </PatientsProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
