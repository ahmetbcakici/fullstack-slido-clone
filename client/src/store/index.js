import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import {userReducer, participantReducer} from './reducers';

const reducers = combineReducers({userReducer, participantReducer});

export const store = createStore(reducers, applyMiddleware(thunk));
