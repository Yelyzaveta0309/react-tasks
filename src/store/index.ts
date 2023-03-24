import {combineReducers } from 'redux';
import {persistStore, persistReducer} from 'redux-persist'
import { chatReducer, ChatsState } from './chats/reducer';
import { ProfileState } from './profile/slice';
import { profileReducer} from './profile/slice';

import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
// export const composeEchancers = 
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface StoreState{
    profile: ProfileState;
    chats: ChatsState;
}

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['profile'],
};

const rootReducer = combineReducers<StoreState>({
    profile: profileReducer,
    chats: chatReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = createStore(
//     persistedReducer,
//     applyMiddleware(thunk)
// );

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
})


export const persistor = persistStore(store);