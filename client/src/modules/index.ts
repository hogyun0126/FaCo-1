import { combineReducers } from "redux";
import testReducer from "./test";

const rootReducer = combineReducers({
  testReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
