import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import { arrayBuffer } from 'stream/consumers';
import { images } from '../dummyData/images';

import LocaList from './Component/location';
import { RootState } from '../modules';

import RPost from './boardComponent/rPost';
import { PostType } from '../modules/posts';


function Home() {
  const stateLocation = useSelector((state: RootState) => state.locationReducer.lLts);
	const stateRPost = useSelector((state: RootState) => state.postsReducer.rLts);
	const stateQPost = useSelector((state: RootState) => state.postsReducer.qLts);

  const locations = stateLocation.sort((a, b) => a.locationKr > b.locationKr ? 1 : -1);
	const recommand = stateRPost.sort((a, b) => a.id > b.id ? 1 : -1).slice(0, 5);
	const question = stateQPost.sort((a, b) => a.id > b.id ? 1 : -1).slice(0, 5);
	
	// 지역별 초기값 설정
	const [weather, setWeather] = useState<string>('Clear');
	const [selected, setSelected] = useState<string>('');

	const api = {
		key: '', // 비공개 키로 만들기
		base: 'https://api.openweathermap.org/data/2.5/'
	}
	
	const dateBuilder =(d: any) => {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();
		
		return `${day} ${date} ${month} ${year}`
	}
	
	const search = (e:any) => {
			fetch(`${api.base}weather?q=${selected}&units=metric&APPID=${api.key}`)
			.then(res => res.json())
			.then(result => {
				setWeather(result.weather[0].main);
				console.log(result);
			})
	}
	// const search = (e:any) => {
	// 	if(e.key === 'Enter')
	// 		fetch(`${api.base}weather?q=${selected}&units=metric&APPID=${api.key}`)
	// 		.then(res => res.json())
	// 		.then(result => {
	// 			setWeather(result);
	// 			setSelected(''); 
	// 			console.log(result);
	// 		})
	// }
	

	const inputChange = (e:any) => {
		let selectedLocation = locations.filter(el => el.locationKr === e.target.value)[0]
		setSelected(selectedLocation.locationEn)
	}

	const handleSelect = (e:any) => {
    // setSelected(e.target.value);
    setSelected(e.target.value)

		// fetch(`${api.base}weather?q=${selected}&units=metric&APPID=${api.key}`)
		// 	.then(res => res.json())
		// 	.then(result => {
		// 		setWeather(result);
		// 		// setSelected('');
		// 		console.log(result);
		// 	})
  };


  return (
    <div className='home-container'>
			<div>
				{/* {(typeof weather.main !== 'undefined') ? (
					<span>날씨 : {weather.main[0].main}</span>

				) : ('')} */}

				{/* <input type='text'
				onChange={e => inputChange(e)} value={selected} onKeyPress={search}></input> */}
				<input type='text'
				onChange={e => setSelected(e.target.value)} value={selected} onKeyPress={search}></input>
				
				{/* 지역 선택 */}
				<select onChange={e=>handleSelect(e)}>
					{locations.map(loca => <LocaList key={loca.id} location={loca}/>)}
				</select>
				<div onClick={search}>선택</div>
				<div>날씨 : {`${weather}`} </div>
				<div>날짜 : {dateBuilder(new Date())}</div>
			</div>
			<div>

			<div>인기게시글</div>
				<ul className='home-ul'>
					{recommand/*filter(post=>post.weather === weather)*/.map(el =>
					<li key={el.id}><img className='home-recommand-images'  src={el.img.length !== 0 ? el.img[0].url : ''} alt='ddd'/></li>)}
				</ul>
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