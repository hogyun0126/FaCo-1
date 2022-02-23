import { type } from "os";
// Ducks patten (action type, action function, reducer in single file)

// action type
const UPDATE = 'test/UPDATE' as const;
const KEY = 'tes/KEY' as const;

// action function
export const update = (str: string) => {
  return {
    type: UPDATE,
    payload: str,
  }
}

export const increaseKey = (num: number) => {
  return {
    type: KEY,
    payload: num,
  }
}

// action object type
type testAction = 
  |ReturnType<typeof update>
  |ReturnType<typeof increaseKey>

// state type
type testState = {
  text: string
  key: number
}

// state
const initialState: testState = {
  text: '',
  key: 100,
}

// reducer
function testReducer(
  state: testState = initialState,
  action: testAction
): testState {
  switch (action.type) {
    case UPDATE: 
      return Object.assign({}, state, { text : action.payload });
    case KEY:
      return Object.assign({}, state, { key : action.payload + 1});
    default:
      return state;
  }
}

export default testReducer;
