import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './modal.css';
import logo from '../../logo/FaCo.png';

import LocaList from '../Component/location';
import { RootState } from '../../modules';
const axios = require('axios').default;

type MyProps = {
	isSignUpClose: ()=>void;
}


function SignUp({isSignUpClose} : MyProps) {
  const stateLocation = useSelector((state: RootState) => state.locationReducer.lLts);
  const locations = stateLocation.sort((a, b) => a.locationKr > b.locationKr ? 1 : -1);
  const path = `${process.env.REACT_APP_API_URL}/user/signup`;
  const [ userInfo, setUserInfo ] = useState({
    // id: '',
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    location: '',
    sex: ''
  }); // userInfoState

  const [ isDisable, setIsDisable ] = useState<boolean>(true);
  const [ errMessage, setErrMessage ] = useState<string>('');
  
  
  
  useEffect(() => {
    setErrMessage(verifyInputValue);
  }, [userInfo]);

  function handleInputValue (e:any) {
    setUserInfo(Object.assign({}, userInfo, {[e.target.name] : e.target.value}));
    
  }

   // input 검증
   function verifyInputValue () {
    const emailReg = new RegExp(/^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/);
    const nameReg = new RegExp(/^[가-힣A-Za-z]{2,20}$/);
    const phoneReg = new RegExp(/010[0-9]{8}/);
    // const idRegExp = new RegExp(/^[a-zA-z0-9]{4,12}$/);
    const passwordRegExp = new RegExp(/^[a-zA-z0-9]{4,12}$/);

    // if (!(idRegExp.test(userInfo.id))) return '아이디는 영문 대소문자와 숫자 4~12자리로 입력해야 합니다';
    if (!(emailReg.test(userInfo.email))) return '올바른 이메일을 입력해주세요';
    if (!(passwordRegExp.test(userInfo.password))) return '비밀번호는 영문 대소문자와 숫자 4~12자리로 입력해야 합니다';
    if (userInfo.password !== userInfo.passwordConfirm) return '비밀번호가 다릅니다';
    if (!(phoneReg.test(userInfo.phone))) return '올바른 핸드폰 번호를 입력해주세요';  
    if (!(nameReg.test(userInfo.name))) return '올바른 이름을 입력해주세요';
    if (!!userInfo.email && !!userInfo.password && !!userInfo.passwordConfirm && !!userInfo.name && !!userInfo.phone) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
    return '';
  }

  function handleSignUpBtnClick () {
    // console.log(userInfo)
    axios.post(path, userInfo, {
      "content-type": "application/json",
      credentials: true,
    })
    .then(function (response:any) {
      isSignUpClose()
      console.log(response);
    })
    .catch(function (error:any) {
      console.log(error.response.data);
    });}

  return (
    <div>
			<div className='sign-up-view'>
        <div onClick={isSignUpClose}>
          <img src={logo} alt="FaCo" className='sign-up-logo'/>
        </div>
        <div>
          <div>이메일 : 
          <input name='email' className='sign-up-title' placeholder='이메일을 입력해주세요' onChange={(e) => handleInputValue(e)}></input>
          </div>
          {/* <div>아이디 : 
            <input name='id' type='text' placeholder='아이디를 입력해주세요' onChange={(e) => handleInputValue(e)}></input>
          </div> */}
          <div>비밀번호 : 
            <input name='password' className='sign-up-title' type='password' placeholder='비밀번호를 입력해주세요' onChange={(e) => handleInputValue(e)}></input>
          </div>
          <div >비밀번호확인 : 
          <input name='passwordConfirm' className='sign-up-title' type='password' placeholder='비밀번호를 한번 더 입력해주세요' onChange={(e)=>handleInputValue(e)}></input>
          </div>
          <div>핸드폰번호 : 
          <input name='phone' className='sign-up-title' placeholder='-없이 입력해주세요' onChange={(e) => handleInputValue(e)}></input>
          </div>
          <div>이름 : 
          <input name='name' className='sign-up-title' placeholder='이름을 입력해주세요' onChange={(e) => handleInputValue(e)}></input>
          </div>
          <div>지역 : 
            <select name='location' className='sign-up-title' onChange={(e) => handleInputValue(e)}>
            <option hidden>---</option>
            {locations.map(loca => <LocaList key={loca.id} location={loca}/>)}
            </select>
          </div>
          <div>성별 : 
            <select name="sex" className='sign-up-title' onChange={(e) => handleInputValue(e)}>
              <option hidden>---</option>
              <option value='male'>남자</option>
              <option value='female'>여자</option>
            </select>
          </div>
        </div>

        <div className='err-message'>{errMessage}</div>
        <button className='signup-btn' disabled={isDisable ? true : false} onClick={handleSignUpBtnClick}>회원가입</button>
        <button className='signup-btn' onClick={isSignUpClose}>취소</button>
      </div>
    </div>
  );
}

export default SignUp