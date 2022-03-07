import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { RootState } from "../modules";
import { userInfo , userInfoType} from "../modules/userInfo";
import LocaList from './Component/location';

const axios = require('axios').default;


function MyInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);
  const stateLocation = useSelector((state: RootState) => state.locationReducer.lLts);

  const path = `${process.env.REACT_APP_API_URL}/user/modify`;
  const locations = stateLocation.sort((a, b) => a.locationKr > b.locationKr ? 1 : -1);
  const initialLocation = locations.filter(el=>el.locationEn===stateUserInfo.userInfo.location)[0]
  const [ modifying, setModifying ] = useState(false)
  const [selected, setSelected]= useState(initialLocation)

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
    axios.patch(`${path}`, {}, { headers: {
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
      navigate('/')
      
    })
    .catch(function (error:any) {
      console.log(error.response.data);
    });
  }

  const modifyingClose= function() :void {
    // if(userInfos.password !== ''){
    //   isModifyPasswordClicked()
    // }
    // if(userInfos.location !== stateUserInfo.userInfo.location){
    //   isModifyLocationClicked()
    // }
    // if(userInfos.phone !== stateUserInfo.userInfo.phone){
    //   isModifyPhoneClicked()
    // }
    axios.patch(path, { password: userInfos.password, phone: userInfos.phone, location: userInfos.location},
      { headers: {
      Authorization: `Bearer ${stateUserInfo.userInfo.accessToken}`,
      "Content-Type": "application/json",
      credentials: true
    }})
    .then(function (response:any) {
      const data = response.data.data
      const userInfos = Object.assign({},stateUserInfo)
      userInfos.userInfo.phone = data.phone
      userInfos.userInfo.location = data.location
      dispatch(userInfo(userInfos.userInfo));
      setModifying(false);
      console.log(response);
    })
    .catch(function (error:any) {
      console.log(error.response);
    });
    
  }


  
  return (
    <div className='myinfo-container'>
      <ul className='myinfo-first-box'>
        <li>
          <div>이메일 :</div>
          <div>{stateUserInfo.userInfo.email}</div>
        </li>
        {modifying?
        <li>
          <div>비밀번호 :</div>
          <div><input className='myinfo-modify-input' type='password' name='password' placeholder='변경할 비밀번호를 입력해주세요' onChange={(e) => handleInputValue(e)}></input></div>
        </li>:
        ''}
        {modifying?
        <li>
          <div>비밀번호확인 :</div>
          <div><input className='myinfo-modify-input' type='password' name='passwordConfirm' placeholder='비밀번호를 한번 더 입력해주세요' onChange={(e)=>handleInputValue(e)}></input></div>
        </li>:
        ''}
        <li>
          <div>지역 :</div>
          {modifying?<div><select className='myinfo-modify-select' onChange={(e) => handleInputValue(e)} name='location'>
          <option >{userInfos.location}</option>
          {locations.map(loca => <LocaList key={loca.id} location={loca}/>)}
          </select></div>:
          <div>서울</div>
          } 
        </li>
        <li>
          <div>이름 :</div>
          <div>{stateUserInfo.userInfo.name}</div>
        </li>
        <li>
          <div>핸드폰번호 :</div>
          <div>{modifying?
          <input className='myinfo-modify-input' name='phone' placeholder={stateUserInfo.userInfo.phone} onChange={(e) => handleInputValue(e)}></input>
          :stateUserInfo.userInfo.phone}</div>
        </li>
        <li>
          <div>성별 :</div>
          <div>{stateUserInfo.userInfo.sex}</div>
        </li>
      </ul>
      {modifying?<div className='myinfo-second-box'>
        <button className='myinfo-btn' onClick={modifyingClose}>수정완료</button>
        <button className='myinfo-btn' onClick={modifyingClicked}>취소</button>
      </div>
      :<div className='myinfo-second'>
        <button className='myinfo-btn' onClick={modifyingClicked}>수정하기</button>
        <button className='myinfo-btn' onClick={isWithdrawClicked}>회원탈퇴</button></div>
      }
      
			
    </div>
  );
}

export default MyInfo