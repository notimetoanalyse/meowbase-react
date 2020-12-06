import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, compose, applyMiddleware } from 'redux'
import * as serviceWorker from './serviceWorker';
import { rootReducer } from './redux/rootReducer'
import { BrowserRouter } from 'react-router-dom';
// import reducer, { initialState } from './reducer';
// import { PatientsProvider } from './context/PatientsContext';

const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {app}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
