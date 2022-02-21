import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import './modal.css';

import LocaList from '../Component/location';
import { RootState } from '../../modules';
import { userInfoType } from '../../modules/userInfo';

type MyProps = {
	isSignUpClose: ()=>void;
}

function SignUp({isSignUpClose} : MyProps) {
  const stateLocation = useSelector((state: RootState) => state.locationReducer.lLts);
  const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);
  
  const locations = stateLocation.sort((a, b) => a.locationKr > b.locationKr ? 1 : -1);
  
  const [ userInfo, setUserInfo ] = useState(stateUserInfo);
  const [ errMessage, setErrMessage ] = useState('');

  


  return (
    <div>
			<div className='sign-in-view'>
        <div>아이디 : 
          <input></input>
        </div>
        <div>비밀번호 : 
          <input></input>
        </div>
        <div>비밀번호확인 : 
        <input></input>
        </div>
        <div>핸드폰번호 : 
        <input></input>
        </div>
        <div>이메일 : 
        <input></input>
        </div>
        <div>지역 : 
          <select>
          {locations.map(loca => <LocaList key={loca.id} location={loca}/>)}
          </select>
        </div>
        <div>성별 : 
          <select>
            <option>남자</option>
            <option>여자</option>
          </select>
        </div>
        <button onClick={isSignUpClose}>회원가입</button>
      </div>
    </div>
  );
}

export default SignUp