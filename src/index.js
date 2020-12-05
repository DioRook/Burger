import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router,} from 'react-router-dom'
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk'
import burderBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/orders'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burderBuilder: burderBuilderReducer,
  order: orderReducer  
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));


const app = (
  <Provider store={store}>
  <Router>
    <App />
  </Router>
  </Provider>
)
ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
