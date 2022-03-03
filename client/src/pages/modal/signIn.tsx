import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../modules";
import { userInfo , userInfoType} from "../../modules/userInfo";
import SignUp from './signUp';

const axios = require('axios').default;

type MyProps = {
	isSignInClose: ()=>void;
  isLogInCancle: ()=>void;
}

function SignIn({isSignInClose, isLogInCancle}:MyProps) {
  const dispatch = useDispatch();
  const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);
  const path = 'http://localhost:4000/user/signin';

  const [ userEmail, setUserEmail ] = useState('')
  const [ userPassword, setUserPassword ] = useState('')
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  function handleEmailValue (e:any) : void {
    setUserEmail(e.target.value)
  }
  function handlePasswordValue (e:any) : void {
    setUserPassword(e.target.value)
    
  }
  
  const isSignUpClicked = () : void => {
    setIsSignUp(!isSignUp)
  }

  async function handleSignInBtnClick () {
    
    await axios.post(path, {email: userEmail, password: userPassword}, {
      "content-type": "application/json",
      credentials: true,
    })
    .then(function (response:any) {
      const data = response.data.data
      const userInfos = Object.assign({},stateUserInfo)
      userInfos.userInfo.accessToken = data.accessToken
      dispatch(userInfo(userInfos.userInfo));
      isSignInClose()
    })
    .catch(function (error:any) {
      console.log(error.response.data.message);
    })

    await axios.get(path, 
      // {headers: {
      //   Authorization: `Bearer ${stateUserInfo.userInfo.accessToken}`,
      //   "Content-Type": "application/json",
      // }}
      {email: userEmail, password: userPassword},
      {
        "content-type": "application/json",
        credentials: true,
      }
      )
      .then(function(response:any){
        const data = response.data.data
        const userInfos = Object.assign({},stateUserInfo)
        userInfos.userInfo.name = data.name
        userInfos.userInfo.email = data.phone
        userInfos.userInfo.name = data.email
        userInfos.userInfo.name = data.location
        userInfos.userInfo.name = data.sex
        dispatch(userInfo(userInfos.userInfo));
      })
      .catch(function (error:any) {
        console.log(error.response.data.message);
      })}
  
    
  return (
    <div className='modal-background'>
			<div className='sign-in-view'>
        <div onClick={isLogInCancle}>X
        </div>
      <div className='sign-title'>이메일 : 
          <input type='text' name='email' onChange={(e)=>handleEmailValue(e)}></input>
        </div>
        <div className='sign-title'>비밀번호 : 
          <input type='password' name='password' onChange={(e)=>handlePasswordValue(e)}></input>
        </div>

        <button onClick={handleSignInBtnClick}>로그인</button>
        <button onClick={isSignUpClicked}>회원가입</button>
      </div>

      {isSignUp ? <SignUp isSignUpClose={isSignUpClicked}></SignUp> : ''}
    </div>
  );
}

export default SignIn

// const isHandleClickTest = () => {
//   dispatch(userInfo({
//     // id: 'ddd',
//     name: 'gunpyo',
//     phone: 1,
//     email: 'asdf@asdf.com',
//     location: 'Seoul',
//     sex: '남자',
//     accessToken: '',
//   }))
// }