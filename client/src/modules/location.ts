// type
const LOCATION_LTS = 'location/LOCATION_LTS' as const;
const LOCATION_SELECTED = 'location/LOCATION_SELECTED' as const;

export type LocationList = {
  [key: string]: number | string | null;
  locationKr: string;
	locationEn: string;
};

export type LocationSelected = {
  locationKr: string;
  locationEn: string;
}

// action

export const locationLts = (arr: LocationList[]) => {
  return {
    type: LOCATION_LTS,
    payload: arr
  }
}
export const locationSelected = (arr:LocationSelected) => {
  return {
    type: LOCATION_SELECTED,
    payload: arr
  }
}

// action type
type LocationAction = 
  |ReturnType<typeof locationLts>
  |ReturnType<typeof locationSelected>

// state type
type LocationState = {
  lLts: LocationList[];
  selected: LocationSelected[];
}

// state
const initialState: LocationState = {
  lLts: [],
  selected: [],
}

// reducer
function locationReducer(
  state: LocationState = initialState,
  action: LocationAction
): LocationState {
  switch (action.type) {
    case LOCATION_LTS:
      return Object.assign({}, state, { lLts : action.payload });
    case LOCATION_SELECTED:
      return Object.assign({}, state, { selected : action.payload});
    default:
      return state;
  }
}

export default locationReducer;
