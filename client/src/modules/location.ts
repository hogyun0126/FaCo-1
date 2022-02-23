// type
const LOCATION_LTS = 'location/LOCATION_LTS' as const;

export type LocationList = {
  [key: string]: number | string | null;
  locationKr: string;
	locationEn: string;
};

// action

export const locationLts = (arr: LocationList[]) => {
  return {
    type: LOCATION_LTS,
    payload: arr
  }
}

// action type
type LocationAction = 
  ReturnType<typeof locationLts>

// state type
type LocationState = {
  lLts: LocationList[];
}

// state
const initialState: LocationState = {
  lLts: []
}

// reducer
function locationReducer(
  state: LocationState = initialState,
  action: LocationAction
): LocationState {
  switch (action.type) {
    case LOCATION_LTS:
      return Object.assign({}, state, { lLts : action.payload });
    default:
      return state;
  }
}

export default locationReducer;
