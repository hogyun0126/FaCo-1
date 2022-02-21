import React, { useEffect, useState, useRef } from "react";
import { BiLike} from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiUser, FiUserX, FiUserPlus, FiUserMinus } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { listenerCount } from 'process';
import UserSideBar from "./modal/userSideBar";
import SignIn from './modal/signIn';

import { NavLink } from "react-router-dom";


function Menu() {

	const indicator = useRef<any>([]);

	const isClikcedMenu = (e:any) => {
		let indicatorList = e.currentTarget.parentNode.children
		// e.currentTarget.className = 'active'
		for (let i = 0; i < indicatorList.length; i++) {
      indicatorList[i].className = ''
			indicator.current[i].className = ''; 
      if (indicatorList[i] === e.currentTarget) {
				indicatorList[i].className = 'active'
			indicator.current[i].className = 'indicator'; 
      }
    }
		console.log(indicator)
		console.log(e.currentTarget.parentNode.children)
		console.log(e.currentTarget)
	}

	const [ isLogIn, setIsLogIn] = useState<boolean>(false);
	
	const [ isSideBar, setIsSideBar ] = useState<boolean>(false);

	const [ isSignIn, setIsSignIn ] = useState<boolean>(false);
	const [ isSignUp, setIsSignUp ] = useState<boolean>(false);

	const isLogInClicked = () => {
		setIsLogIn(!isLogIn)
		setIsSignIn(true)
	}
	const isSignInClose = () => {
		setIsSignIn(false)
	}
	const isSideBarClicked = () => {
		setIsSideBar(!isSideBar)
	}


  return (
		<div className='menu-container'>
			<div className='menu-list-container'>
				<ul className='menu-list'  >
					<li value='home' >
						<NavLink to='/' onClick={isClikcedMenu}>
							<div className='menu-icon'><BiLike/></div>
							<div className='menu-text'>홈페이지</div>
							<div ref={el=>indicator.current[0]=el}></div>
						</NavLink>
					</li>
					<li onClick={isClikcedMenu} value='rBoard'>
						<NavLink to='/rBoard'>
							<div className='menu-icon'><BiLike/></div>
							<div className='menu-text'>추천게시판</div>
							<div ref={el=>indicator.current[1]=el} ></div>
						</NavLink>
					</li>
					<li onClick={isClikcedMenu} >
						<NavLink to='/qBoard'>
							<div className='menu-icon'><AiOutlineQuestionCircle/></div>
							<div className='menu-text'>질문게시판</div>
							<div ref={el=>indicator.current[2]=el}></div>
						</NavLink>
					</li>
					<li onClick={isLogInClicked}>
					{isLogIn?
						<a href='#'>
							<div className='menu-icon'><FiUserX/></div>
							<div className='menu-text'>로그인</div>						
						</a>:
						<a href='#'>
							<div className='menu-icon'><FiUser/></div>
							<div className='menu-text'>로그아웃</div>						
						</a>
					}
					</li>
					<li>
					  {isLogIn?'':<FaBars onClick={isSideBarClicked} className='menu-icon menu-myinfo'></FaBars>}
					</li>
				</ul>
			</div>
			{isSideBar? <UserSideBar isSideBarClose={isSideBarClicked}/> : ''}
			{isSignIn ? <SignIn isSignInClose={isSignInClose}></SignIn> : ''}
			
		</div>
  );
}

export default Menu