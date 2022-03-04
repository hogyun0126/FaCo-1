import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { arrayBuffer } from 'stream/consumers';
import { images } from '../dummyData/images';

import LocaList from './Component/location';
import { RootState } from '../modules';

import RPost from './boardComponent/rPost';
import { PostType } from '../modules/posts';
import { LocationSelected } from "../modules/location";
import Weather from "./Component/weather";


function Home() {
	const dispatch = useDispatch();
  const stateLocation = useSelector((state: RootState) => state.locationReducer);
	const stateRPost = useSelector((state: RootState) => state.postsReducer.rLts);
	const stateQPost = useSelector((state: RootState) => state.postsReducer.qLts);

  const locations = stateLocation.lLts.sort((a, b) => a.locationKr > b.locationKr ? 1 : -1);
	const recommand = stateRPost.slice(-5);
	const question = stateQPost.slice(-5);
	
	// 지역별 초기값 설정
	const api = {
		key: 'da646735954e126fccbdcd34e0005c8c', // 비공개 키로 만들기
		base: 'https://api.openweathermap.org/data/2.5/'
	}
	const [selected, setSelected]= useState<string>('서울')
	const [weather, setWeather] = useState<string>('');

	// 오늘날짜
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
	const todayDay:string = days[new Date().getDay()]
	const todayDate:number = new Date().getDate()
	const todayMonth:number = new Date().getMonth() + 1
	const todayYear = new Date().getFullYear()

	//날씨검색
	const search = () => {
			fetch(`${api.base}weather?q=${selected}&units=metric&APPID=${api.key}`)
			.then(res => res.json())
			.then(res => {
				setWeather(res.weather[0].main);
			})
	}
	//지역선택
	const handleSelect = (e:any) => {
    setSelected(e.target.value);
  };
	useEffect(():void => {
		search()
	})

  return (
    <div className='home-container'>
			<div className='home-first-container'>
				<div className='home-first-column'>
					<div><Weather/> </div>
					<div>{todayYear}년 {todayMonth}월 {todayDate}일</div>
					<div>{todayDay}</div>

					<select onChange={e=>handleSelect(e)}>
						<option hidden>{selected}</option>
						{locations.map(loca => <LocaList key={loca.id} location={loca}/>)}
					</select>
				</div>
				<div className='home-second-column'>
					<ul className='home-ul'>
						{recommand/*filter(post=>post.weather === weather)*/.map(el =>
						<li key={el.id}><img className='home-recommand-images'  src={el.img.length !== 0 ? el.img[0].url : ''} alt='ddd'/></li>)}
					</ul>
				</div>
			</div>
			
			<div>인기게시글
				<ul>
					{recommand/*.filter(post => post.weather === weather)*/.map(post => <div key={post.id}>{post.title}</div>)}
				</ul>
			</div>
			<div>질문게시글
				<ul>
					{question/*.filter(post => post.weather === weather)*/.map(post => <div key={post.id}>{post.title}</div>)}
				</ul>
			</div>
    </div>
  );
}

export default Home