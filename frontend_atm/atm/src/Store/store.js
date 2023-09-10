// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {authenticateReducer,accountReducer,transactionsReducer} from './reducers/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    authenticateData:authenticateReducer,
    accountDetails : accountReducer,
    transactions : transactionsReducer
  });


export let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);


