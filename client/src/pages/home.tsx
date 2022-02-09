import React from 'react';
import { arrayBuffer } from 'stream/consumers';
import { images } from '../dummyData/images';


function Home() {

  return (
    <div className='home-container'>
			<div>
				<span>날씨 : {}</span>
				<span>날짜 : {}</span>
				<span>지역 : <select>
					<option>서울</option>
					<option>인천</option>
					<option>대구</option>
					<option>수원</option>
					<option>광주</option>
					</select></span>
			</div>
			<div>
				<div>인기게시글</div>
				<ul className='home-ul'>
					{images.map(el =>
					<li key={el}><img className='home-recommand-images'  src={el} alt='ddd'/></li>)}
				</ul>
				
			</div>
    </div>
  );
}

export default Home