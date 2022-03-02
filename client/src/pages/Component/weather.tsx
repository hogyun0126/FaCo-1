import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../modules';

function Weather(){
	// const dispatch = useDispatch();
	const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);

	const api = {
		key: 'da646735954e126fccbdcd34e0005c8c', // 비공개 키로 만들기
		base: 'https://api.openweathermap.org/data/2.5/'
	}
	const userLocation = userInfo.location
	
	const [weather, setWeather] = useState<any>('');
	

	const weatherList = {
		Clear: ['Clear'],
		Clouds: ['Clouds','Smoke','Haze','Dust','Fog','Sand','Dust','Ash','Squall','Tornado'],
		Rain: ['Rain', 'Thunderstorm', 'drizzle'],
		Snow: ['Snow']
	}


	const search = () => {
		fetch(`${api.base}weather?q=${userLocation}&units=metric&APPID=${api.key}`)
		.then(res => res.json())
		.then(res => {
			const weatherSelected = res.weather[0].main
			function weatherChange(res:any) {
				for(let i = 0; i < Object.keys(weatherList).length; i++){
					if(Object.keys(weatherList)[i].includes(weatherSelected)){
						return Object.keys(weatherList)[i]
					}
				}
			}
			setWeather(weatherChange(res));
			console.log(res);
		})
}
	useEffect(() : void => {
		search()
	})


	return (
		<div>
			{weather}
		</div>
	);
}

export default Weather
