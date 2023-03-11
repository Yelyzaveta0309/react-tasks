import {createStore} from 'redux';
import { profileReducer } from './profile/reducer';
// export const composeEchancers = 
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(profileReducer);