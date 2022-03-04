import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../modules";
import { userInfo , userInfoType} from "../modules/userInfo";
import LocaList from './Component/location';

const axios = require('axios').default;


function MyInfo() {
  const dispatch = useDispatch();
  const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);
  const stateLocation = useSelector((state: RootState) => state.locationReducer.lLts);

  const path = 'http://localhost:4000/user';
  const locations = stateLocation.sort((a, b) => a.locationKr > b.locationKr ? 1 : -1);
  // (stateLocation.filter(el => el.locationEn === stateUserInfo.userInfo.location))[0].locationKr
  const [ modifying, setModifying ] = useState(false)
  const [selected, setSelected]= useState('Seoul')
  const [ userInfos, setUserInfos ] = useState({
    password: '',
    passwordConfirm: '',
    name: stateUserInfo.userInfo.name,
    phone: stateUserInfo.userInfo.phone,
    location: stateUserInfo.userInfo.location,
    sex: stateUserInfo.userInfo.sex
  });

  const modifyingClicked = function() {
    setModifying(!modifying) // 확인용
    // setModifying(true) 
  }
  //회원정보수정
  function handleInputValue (e:any) {
    setUserInfos(Object.assign({}, userInfos, {[e.target.name] : e.target.value}));
  }
  const isModifyPasswordClicked = function(){
    axios.patch(`${path}`, { password: userInfos.password }, { headers: {
      Authorization: `Bearer ${stateUserInfo.userInfo.accessToken}`,
      "Content-Type": "application/json",
      credentials: true
    }})
    .then(function (response:any) {
      console.log(response);
    })
    .catch(function (error:any) {
      console.log(error.response);
    });
  }
  const isModifyLocationClicked = function(){
    axios.patch(`${path}`, {location:userInfos.location }, { headers: {
      Authorization: `Bearer ${stateUserInfo.userInfo.accessToken}`,
      "Content-Type": "application/json",
      credentials: true
    }})
    .then(function (response:any) {
      const data = response.data.data
      const userInfos = Object.assign({},stateUserInfo)
      userInfos.userInfo.location = data.location
      dispatch(userInfo(userInfos.userInfo));
      console.log(response);
    })
    .catch(function (error:any) {
      console.log(error.response);
    });
  }
  const isModifyPhoneClicked = function(){
    axios.patch(`${path}`, { phone: userInfos.phone}, { headers: {
      Authorization: `Bearer ${stateUserInfo.userInfo.accessToken}`,
      "Content-Type": "application/json",
      credentials: true
    }})
    .then(function (response:any) {
      const data = response.data.data
      const userInfos = Object.assign({},stateUserInfo)
      userInfos.userInfo.phone = data.phone
      dispatch(userInfo(userInfos.userInfo));
      console.log(response);
    })
    .catch(function (error:any) {
      console.log(error.response);
    });
  }
  //회원탈퇴
  const isWithdrawClicked = function() {
    axios.delete(`${path}`,{ headers: {
      Authorization: `Bearer ${stateUserInfo.userInfo.accessToken}`,
      "Content-Type": "application/json",
      credentials: true
    }})
    .then(function(response:any) {
      console.log(response)
    })
    .catch(function (error:any) {
      console.log(error.response.data);
    });
  }

  const modifyingClose= function() :void {
    if(userInfos.password !== ''){
      isModifyPasswordClicked()
    }
    if(userInfos.location !== stateUserInfo.userInfo.location){
      isModifyLocationClicked()
    }
    if(userInfos.phone !== stateUserInfo.userInfo.phone){
      isModifyPhoneClicked()
    }
    setModifying(false);
  }
  
  return (
    <div>
      <ul>
        <li>
          이메일: 
          {stateUserInfo.userInfo.email}
        </li>
          {modifying?
          <li>비밀번호: <input type='password' placeholder='변경할 비밀번호를 입력해주세요' onChange={(e) => handleInputValue(e)}></input></li>:
          ''}
          {modifying?
          <li>비밀번호확인: <input type='password' name='passwordConfirm' placeholder='비밀번호를 한번 더 입력해주세요' onChange={(e)=>handleInputValue(e)}></input>
          </li>:
          ''}
        <li>
          지역:
          {modifying?<span><select onChange={(e) => handleInputValue(e)} name='location'>
          <option >{selected}</option>
          {locations.map(loca => <LocaList key={loca.id} location={loca}/>)}
          </select></span>:
          <span>{selected}</span>
          } 
        </li>
        <li>
          이름:{userInfos.name}
        </li>
        <li>
          핸드폰번호:{modifying?
          <input name='phone' placeholder={userInfos.phone} onChange={(e) => handleInputValue(e)}></input>
          :userInfos.phone}
        </li>
        <li>
          성별:{userInfos.sex}
        </li>
      </ul>
      {modifying?<div>
      <button onClick={modifyingClose}>수정완료</button>
      <button onClick={modifyingClicked}>취소</button>
      </div>
      :<div><button onClick={modifyingClicked}>수정하기</button>
      <button onClick={isWithdrawClicked}>회원탈퇴</button></div>
      }
      
			
    </div>
  );
}

export default MyInfo