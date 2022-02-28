// type
const WEATHER_INFO = 'weatherInfo/Weather_INFO' as const;

export type WeatherInfoType = {
	weatherType: string,
}

// action

export const weatherInfo = (arr: WeatherInfoType[]) => {
  return {
    type: WEATHER_INFO,
    payload: arr
  }
}

// action type
type WeatherInfoAction = 
  |ReturnType<typeof weatherInfo>

// state type
type WeatherInfoState = {
	weatherSelect: WeatherInfoType;
}

//state
const initialState: WeatherInfoState = {
  weatherSelect: {weatherType: 'Clear'}
}



// reducer
function weatherInfoReducer(
  state: WeatherInfoState = initialState,
  action: WeatherInfoAction
): WeatherInfoState {
  switch (action.type) {
    case WEATHER_INFO:
      return Object.assign({}, state, { weather : action.payload });
    default:
      return state;
  }
}

export default weatherInfoReducer;