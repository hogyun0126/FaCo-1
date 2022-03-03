import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../modules";
import { userInfo , userInfoType} from "../modules/userInfo";
import LocaList from './Component/location';
const axios = require('axios').default;


function MyInfo() {
  const dispatch = useDispatch();
  const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);
  const stateLocation = useSelector((state: RootState) => state.locationReducer);

  const path = 'http://localhost:4000/user/modify';
  const [ userInfos, setUserInfos ] = useState(stateUserInfo);
  const [ modifying, setModifying ] = useState(false)
  const [selected, setSelected]= useState('서울')
  const [ userInfo, setUserInfo ] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    location: '',
    sex: ''
  });


  const locations = stateLocation.lLts.sort((a, b) => a.locationKr > b.locationKr ? 1 : -1);
  const modifyingClicked = function() {
    setModifying(!modifying) // 확인용
    // setModifying(true) 
  }

  const handleSelect = (e:any) => {
    setSelected(e.target.value);
    // selected.locationKr = e.target.value

		// fetch(`${api.base}weather?q=${selected}&units=metric&APPID=${api.key}`)
		// 	.then(res => res.json())
		// 	.then(result => {
		// 		setWeather(result);
		// 		// setSelected('');
		// 		console.log(result);
		// 	})
  };

  function handleInputValue (e:any) {
    setUserInfos(Object.assign({}, userInfos, {[e.target.name] : e.target.value}));
    console.log(e.target.value)
    console.log(userInfo)
  }

  const isModifyClicked = function(){
    axios.post(path, userInfo, {
      "content-type": "application/json",
      credentials: true,
    })
    .then(function (response:any) {
      setModifying(false);
    
      console.log(response);
    })
    .catch(function (error:any) {
      console.log(error.response.data);
    });
  }


  return (
    <div>
      <ul>
        <li>
          이메일: 
          {modifying?
          <input name='email' placeholder='이메일을 입력해주세요' onChange={(e) => handleInputValue(e)}></input>
          :userInfos.userInfo.email}
        </li>
          {modifying?
          <li>비밀번호: <input type='password' placeholder='비밀번호를 입력해주세요' onChange={(e) => handleInputValue(e)}></input></li>:
          ''}
          {modifying?
          <li>비밀번호확인: <input type='password' name='passwordConfirm' placeholder='비밀번호를 한번 더 입력해주세요' onChange={(e)=>handleInputValue(e)}></input></li>:
          ''}
        <li>
          지역:
          {modifying?	<select name='location'>
          <option hidden>---</option>
          {locations.map(loca => <LocaList key={loca.id} location={loca}/>)}
          </select>:
          ''
        }
        </li>
        <li>
          이름:{userInfos.userInfo.name}
        </li>
        <li>
          핸드폰번호:{modifying?
          <input name='phoneNumber' placeholder='핸드폰번호를 입력해주세요' onChange={(e) => handleInputValue(e)}></input>
          :userInfos.userInfo.phone}
        </li>
        <li>
          성별:{userInfos.userInfo.sex}
        </li>
      </ul>
      {modifying?<div>
      <button onClick={isModifyClicked}>수정완료</button>
      <button onClick={modifyingClicked}>취소</button>
      </div>
      :<div><button onClick={modifyingClicked}>수정하기</button></div>}
      
      
      
			
    </div>
  );
}

export default MyInfo