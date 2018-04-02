import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk, logger());
const reducer = combineReducers({ ...reducers});
export default createStore(reducer, middleware);
