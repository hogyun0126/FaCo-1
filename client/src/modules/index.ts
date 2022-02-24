import { combineReducers } from "redux";
import testReducer from "./test";
import postsReducer from "./posts";
import locationReducer from "./location";
import userInfoReducer from "./userInfo";
import menuReducer from "./menus";

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['postsReducer','locationReducer','userInfoReducer','menuReducer'],
}

const rootReducer = combineReducers({
  testReducer,
  postsReducer,
  locationReducer,
  userInfoReducer,
  menuReducer
});

export const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;
