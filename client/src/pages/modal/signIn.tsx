import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../modules";
import { userInfo , userInfoType} from "../../modules/userInfo";
import SignUp from './signUp';
import logo from '../../logo/FaCo.png';

const axios = require('axios').default;

type MyProps = {
	isSignInClose: ()=>void;
  isLogInCancle: ()=>void;
}

function SignIn({isSignInClose, isLogInCancle}:MyProps) {
  const dispatch = useDispatch();
  const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);
  const path = 'http://localhost:4000/user';

  const [ userEmail, setUserEmail ] = useState('')
  const [ userPassword, setUserPassword ] = useState('')
  const [ isSignUp, setIsSignUp ] = useState<boolean>(false)
  const [ isSignInAccess, setIsSignInAccess ] = useState<boolean>(true)
  const [ errorMessage, setErrorMessage ] = useState('')

  function handleEmailValue (e:any) : void {
    setUserEmail(e.target.value)
  }
  function handlePasswordValue (e:any) : void {
    setUserPassword(e.target.value)
  }
  function loginFailed (message:any) : void {
    setIsSignInAccess(false)
    setErrorMessage(message)
  }
  const isSignUpClicked = () : void => {
    setIsSignUp(!isSignUp)
  }

  async function handleSignInBtnClick () {
    
    await axios.post(`${path}/signin`, {email: userEmail, password: userPassword}, {
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
      loginFailed(error.response.data.message)
    })

    await axios.get(`${path}/userInfo`, 
      { headers: {
          Authorization: `Bearer ${stateUserInfo.userInfo.accessToken}`,
          "Content-Type": "application/json",
          credentials: true
        }
      }
      // {email: userEmail, password: userPassword},
      // {
      //   "content-type": "application/json",
      //   credentials: true,
      // }
      )
      .then(function(response:any){
        const data = response.data.data
        console.log(data)
        const userInfos = Object.assign({},stateUserInfo)
        userInfos.userInfo.name = data.name
        userInfos.userInfo.email = data.email
        userInfos.userInfo.phone = data.phone
        userInfos.userInfo.location = data.location
        userInfos.userInfo.sex = data.sex
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
      <div>
        <img src={logo} alt="FaCo" className='sign-in-logo'/>
      </div>
      <div className='sign-title'>이메일 : 
          <input type='text' name='email' onChange={(e)=>handleEmailValue(e)}></input>
        </div>
        <div className='sign-title'>비밀번호 : 
          <input type='password' name='password' onChange={(e)=>handlePasswordValue(e)}></input>
        </div>
        <div className='err-message'>{isSignInAccess?'':errorMessage}</div>

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