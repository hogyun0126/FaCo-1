import { combineReducers } from "redux";
import testReducer from "./test";
import postsReducer from "./posts";

const rootReducer = combineReducers({
  testReducer,
  postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
