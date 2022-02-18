
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import { persistedReducer } from "..";

export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);
