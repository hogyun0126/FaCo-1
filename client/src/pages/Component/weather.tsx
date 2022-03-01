import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../modules';

function Weather(){
	// const dispatch = useDispatch();
const [weather, setWeather] = useState<string>('Clear');

	const api = {
		key: 'da646735954e126fccbdcd34e0005c8c', // 비공개 키로 만들기
		base: 'https://api.openweathermap.org/data/2.5/'
	}
	const stateLocation = useSelector((state: RootState) => state.locationReducer.lLts);
	const weatherList = {
		Clear: ['Clear'],
		Clouds: ['Clouds','Smoke','Haze','Dust','Fog','Sand','Dust','Ash','Squall','Tornado'],
		Rain: ['Rain', 'Thunderstorm', 'drizzle'],
		Snow: ['Snow']
	}

	const search = (e:any) => {
		fetch(`${api.base}weather?q=${stateLocation}&units=metric&APPID=${api.key}`)
		.then(res => res.json())
		.then(res => {
			setWeather(res.weather[0].main);
			console.log(res);
		})
}
	


	return (
		<div>
			{stateLocation}
		</div>
	);
}

export default Weather
