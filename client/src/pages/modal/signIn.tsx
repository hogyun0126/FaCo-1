import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../modules";
import { userInfo , userInfoType} from "../../modules/userInfo";
import SignUp from './signUp';

const axios = require('axios').default;

type MyProps = {
	isSignInClose: ()=>void;
}

function SignIn({isSignInClose}:MyProps) {
  const dispatch = useDispatch();
  const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);
  const [ userInfos, setUserInfos ] = useState(stateUserInfo);
  const [ userEmail, setUserEmail ] = useState('')
  const [ userPassword, setUserPassword ] = useState('')
  const path = 'http://localhost:4000/user/signin';

  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  const isHandleClickTest = () => {
    dispatch(userInfo({
      // id: 'ddd',
      name: 'gunpyo',
      phone: 1,
      email: 'asdf@asdf.com',
      location: 'Seoul',
      sex: '남자'
    }))
  }
  console.log({email: userEmail, password: userPassword})

  function handleEmailValue (e:any) : void {
    setUserEmail(e.target.value)
  }
  function handlePasswordValue (e:any) : void {
    setUserPassword(e.target.value)
    
  }
  
  const isSignUpClicked = () : void => {
    setIsSignUp(!isSignUp)
  }

  function handleSignInBtnClick () {
    axios.post(path, {email: userEmail, password: userPassword}, {
      "content-type": "application/json",
      credentials: true,
    })
    .then(function (response:any) {
      console.log(response)
      dispatch(userInfo(Object.assign({}, userInfos, response.data.data)));
      isSignInClose()
    })
    .catch(function (error:any) {
      console.log(error.response.data);
    });}

  return (
    <div className='modal-background'>
			<div className='sign-in-view'>
        <div onClick={isSignInClose}>X
        </div>
      <div className='sign-title'>이메일 : 
          <input type='text' name='email' onChange={(e)=>handleEmailValue(e)}></input>
        </div>
        <div className='sign-title'>비밀번호 : 
          <input type='password' name='password' onChange={(e)=>handlePasswordValue(e)}></input>
        </div>

        <button onClick={handleSignInBtnClick}>로그인</button>
        <button onClick={isSignUpClicked}>회원가입</button>
        <button onClick={isHandleClickTest}>test</button>
      </div>

      {isSignUp ? <SignUp isSignUpClose={isSignUpClicked}></SignUp> : ''}
    </div>
  );
}

export default SignIn