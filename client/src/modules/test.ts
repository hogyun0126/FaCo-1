import { type } from "os";
// Ducks patten (action type, action function, reducer in single file)

// action type
const UPDATE = 'test/UPDATE' as const;

// action function
export const update = (str: string) => {
  return {
    type: UPDATE,
    payload: str,
  }
}

// action object type
type testAction = 
  |ReturnType<typeof update>;

// state type
type testState = {
  text: string
}

// state
const initialState: testState = {
  text: '',
}

// reducer
function testReducer(
  state: testState = initialState,
  action: testAction
): testState {
  switch (action.type) {
    case UPDATE: 
      return Object.assign({}, state, { text : action.payload });
    default:
      return state;
  }
}

export default testReducer;
