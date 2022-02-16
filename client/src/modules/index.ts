import { combineReducers } from "redux";
import testReducer from "./test";
import postsReducer from "./posts";
import locationReducer from "./location";

const rootReducer = combineReducers({
  testReducer,
  postsReducer,
  locationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
