import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BiLike} from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiUser, FiUserX, FiUserPlus, FiUserMinus } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { listenerCount } from 'process';
import UserSideBar from "./modal/userSideBar";
import SignIn from './modal/signIn';
import logo from '../logo/FaCo.png';
import { userInfo } from "../modules/userInfo";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { updateIndicator } from "../modules/menus";
import { RootState } from "../modules";
const axios = require('axios').default;


function Menu() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const path = 'http://localhost:4000/user/signout';
	const stateUserInfo = useSelector((state: RootState) => state.userInfoReducer);

	const [ isLogIn, setIsLogIn] = useState<boolean>(false); // 메뉴화면 이모티콘
	const [ isSignIn, setIsSignIn ] = useState<boolean>(false); // SignIn 모달화면 
	const [ isSideBar, setIsSideBar ] = useState<boolean>(false);

	const isSignInClose = () => {
		setIsSignIn(false)
	}
	const isLogInCancle =() => {
		// setIsLogIn(false)
		setIsSignIn(false)
	}
	const isSideBarClicked = () => {
		setIsSideBar(!isSideBar)
	}
	function handleSignInBtnClick () {
		// setIsLogIn(true)
		setIsSignIn(true)
	}
	function handleSignOutBtnClick () {
		
		const userInfos = Object.assign({},stateUserInfo)
		userInfos.userInfo.name = ''
		userInfos.userInfo.phone = ''
		userInfos.userInfo.email = ''
		userInfos.userInfo.location = ''
		userInfos.userInfo.sex = ''
		userInfos.userInfo.accessToken = ''
		dispatch(userInfo(userInfos.userInfo));
		setIsLogIn(false)
		navigate('/')
	}
	
  return (
		<div className='menu-container'>
				
					<NavLink to='/'>
						<img src={logo} alt="FaCo" className='menu-logo'/>
					</NavLink>
			
			<div className='menu-list-container'>
				<ul className='menu-list'>
					<li value='rBoard'>
						<NavLink to='/rBoard'>
							<div className='menu-icon'><BiLike/></div>
							<div className='menu-text'>추천게시판</div>
							{/* <div ref={el=>indicator.current[1]=el} ></div> */}
						</NavLink>
					</li>
					<li >
						<NavLink to='/qBoard'>
							<div className='menu-icon'><AiOutlineQuestionCircle/></div>
							<div className='menu-text'>질문게시판</div>
							{/* <div ref={el=>indicator.current[2]=el}></div> */}
						</NavLink>
					</li>
					<li>
					{stateUserInfo.userInfo.accessToken !== ''?
						<a href='#' onClick={handleSignOutBtnClick}>
							<div className='menu-icon'><FiUser/></div>
							<div className='menu-text'>로그아웃</div>						
						</a>:
						<a href='#' onClick={handleSignInBtnClick}>
							<div className='menu-icon'><FiUserX/></div>
							<div className='menu-text'>로그인</div>						
						</a>
					}
					</li>
					<li className='menu-myinfo'>
					  {/* {isLogIn?<FaBars onClick={isSideBarClicked} className='menu-icon menu-myinfo'></FaBars>:''} */}
					  <FaBars onClick={isSideBarClicked} className='menu-icon'></FaBars>
					</li>
				</ul>
			</div>
			{isSideBar? <UserSideBar isSideBarClose={isSideBarClicked}/> : ''}
			{isSignIn ? <SignIn isSignInClose={isSignInClose} isLogInCancle={isLogInCancle}></SignIn> : ''}
			
			
		</div>
  );
}

export default Menu

// const indicator = useRef<any>([]);
// useEffect(() => {
	// 	dispatch(updateIndicator(indicator.current))
	// },[])

	// const isClikcedMenu = (e:any) => {
	// 	let indicatorList = e.currentTarget.parentNode.children
	// 	e.currentTarget.className = 'active'
	// 	for (let i = 0; i < indicatorList.length; i++) {
  //     if(indicator.current !== undefined){
	// 			indicatorList[i].className = ''
	// 			indicator.current[i].className = ''; 
	// 		}
			
  //     if (indicatorList[i] === e.currentTarget) {
	// 			indicatorList[i].className = 'active'
	// 		indicator.current[i].className = 'indicator'; 
  //     }
  //   }
	// }
