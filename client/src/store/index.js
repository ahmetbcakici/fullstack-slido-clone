import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {userReducer, questionerReducer} from './reducers';

const reducers = combineReducers({userReducer, questionerReducer});

export const store = createStore(reducers, applyMiddleware(thunk));
