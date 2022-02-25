import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../modules";
import { userInfo , userInfoType} from "../modules/userInfo";



function MyInfo() {
  const dispatch = useDispatch();
  const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);
  const [ userInfos, setUserInfos ] = useState(stateUserInfo);
  // const path = 'http://localhost:4000/user/modify';


  return (
    <div>
      <ul>
        <li>
          {userInfos.userInfo.email}
        </li>
        <li>
          {userInfos.userInfo.location}
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
      </ul>
			
    </div>
  );
}

export default MyInfo