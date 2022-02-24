// action type
const INDICATOR = 'menus/INDICATOR' as const;


// action function
export const updateIndicator = (arr:any) => {
  return {
    type: INDICATOR,
    payload: arr,
  }
}

// action object type
type menuAction = 
  |ReturnType<typeof updateIndicator>

// state type
type menuState = {
  indicator: any
}

// state
const initialState: menuState = {
  indicator: []
}

// reducer
function menuReducer(
  state: menuState = initialState,
  action: menuAction
): menuState {
  switch (action.type) {
    case INDICATOR: 
      return Object.assign({}, state, { indicator : action.payload });
    default:
      return state;
  }
}

export default menuReducer;