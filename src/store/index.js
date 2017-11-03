import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers/root';

export let history = {};

export function configureStore(initialState = {}, isClient = false) {
  const middlewares = [
    thunk
  ];

  if (isClient) {
    middlewares.push(routerMiddleware(history));
    history = createHistory();
  }

  let composeEnhancers = compose;
  if (global.IS_BROWSER && process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (process.env.NODE_ENV === 'development' && isClient && module.hot) {
    module.hot.accept('./reducers/root', () => {
      const nextReducer = require('./reducers/root').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
