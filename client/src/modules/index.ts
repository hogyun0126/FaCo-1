import { combineReducers } from "redux";
import testReducer from "./test";
import postsReducer from "./posts";

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['postsReducer'],
}

export const rootReducer = combineReducers({
  testReducer,
  postsReducer
});

export const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
