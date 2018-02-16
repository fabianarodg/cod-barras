import 'babel-polyfill';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { isDev, isBrowser } from '../env.config';
// import middlewares from './middlewares';
import reducer from '../../src/reducers/index';


const nextReducer = require('../../src/reducers/index').default;

const devtools =
  isDev && isBrowser && window.devToolsExtension ? window.devToolsExtension : () => fn => fn;

const configureStore = (initialState = {}) => {
  const enhancers = [applyMiddleware(thunk), devtools()];
  const store = createStore(reducer, initialState, compose(...enhancers));
  // console.log('store => ', store);
  if (module.hot) {
    module.hot.accept('../../src/reducers/index', () => {
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};

module.exports = {
  configureStore,
};
