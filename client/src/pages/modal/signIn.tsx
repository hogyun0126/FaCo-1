import React, { useEffect, useState } from "react";
import SignUp from './signUp';

type MyProps = {
	isSignInClose: ()=>void;
}

function SignIn({isSignInClose}:MyProps) {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  
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
      </div>

      {isSignUp ? <SignUp isSignUpClose={isSignUpClicked}></SignUp> : ''}
    </div>
  );
}

export default SignIn