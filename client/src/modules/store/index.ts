
import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from '../index';
import thunk from "redux-thunk";

const store = createStore(rootReducer);

export default store;
