import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../modules";
import { userInfo , userInfoType} from "../modules/userInfo";



function MyInfo() {
  const dispatch = useDispatch();
  const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);
  const [ userInfos, setUserInfos ] = useState(stateUserInfo);
  // const path = 'http://localhost:4000/user/modify';

  const isModifyClicked = function(){
    return ''
  }


  return (
    <div>
      {/* <ul>
        <li>
          이메일 : 
          {isModifyClicked?<input name='email' placeholder='이메일을 입력해주세요' onChange={(e) => handleInputValue(e)}></input>:userInfos.userInfo.email}
        </li>
          {isModifyClicked?<input name='password' placeholder='비밀번호를 입력해주세요' onChange={(e) => handleInputValue(e)}></input></li>:<li>비밀번호 :userInfos.userInfo.email</li>}
          {isModifyClicked?<input name='passwordConfirm' placeholder='비밀번호를 한번 더 입력해주세요' onChange={(e)=>handleInputValue(e)}></input></li>:<li>비밀번호 :userInfos.userInfo.email</li>}
        <li>
          지역 :
          {isModifyClicked?<input name='email' placeholder='이메일을 입력해주세요' onChange={(e) => handleInputValue(e)}></input>:userInfos.userInfo.email}
        </li>
        <li>
          {userInfos.userInfo.name}
        </li>
        <li>
          {userInfos.userInfo.phone}
        </li>
        <li>
          {userInfos.userInfo.sex}
        </li>
      </ul> */}
      <ul>
        <li>
          이메일: test@test.com
        </li>
        <li>
          이메일: test@test.com
        </li>
        <li>
          이메일: test@test.com
        </li>
        <li>
          이메일: test@test.com
        </li>
        <li>
          이메일: test@test.com
        </li>
        <li>
          이메일: test@test.com
        </li>
        <li>
          이메일: test@test.com
        </li>
      </ul>
			
    </div>
  );
}

export default MyInfo