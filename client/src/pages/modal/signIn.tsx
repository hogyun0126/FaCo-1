import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../modules";
import { userInfo } from "../../modules/userInfo";
import SignUp from './signUp';

type MyProps = {
	isSignInClose: ()=>void;
}

function SignIn({isSignInClose}:MyProps) {
  const dispatch = useDispatch();
  const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);
  const [ userInfos, setUserInfos ] = useState(stateUserInfo);

  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  const isHandleClickTest = () => {
    dispatch(userInfo({
      id: 'ddd',
      name: 'gunpyo',
      phone: 1,
      email: 'asdf@asdf.com',
      location: 'Seoul',
      sex: '남자'
    }))
  }
  
  const isSignUpClicked = () : void => {
    setIsSignUp(!isSignUp)
  }

  return (
    <div className='modal-background'>
			<div className='sign-in-view'>
      <div>아이디 : 
          <input type='text'></input>
        </div>
        <div>비밀번호 : 
          <input type='password'></input>
        </div>

        <button onClick={isSignInClose}>로그인</button>
        <button onClick={isSignUpClicked}>회원가입</button>
        <button onClick={isHandleClickTest}>test</button>
      </div>

      {isSignUp ? <SignUp isSignUpClose={isSignUpClicked}></SignUp> : ''}
    </div>
  );
}

export default SignIn