import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './reducer/authReducer';
import { friendsReducer } from './reducer/friendsReducer';
import { messengerReducer } from './reducer/messengerReducer';
import { profileReducer } from './reducer/profileReducer';

const reducers = combineReducers({
  profile: profileReducer,
  messenger: messengerReducer,
  friends: friendsReducer,
  auth: authReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));