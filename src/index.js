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

const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();