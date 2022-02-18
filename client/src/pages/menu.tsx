import React, { useEffect, useState } from "react";
import { BiLike} from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiUser, FiUserX, FiUserPlus, FiUserMinus } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { listenerCount } from 'process';
import UserSideBar from "./modal/userSideBar";

import { NavLink } from "react-router-dom";


function Menu() {

	const [ isHome, setIsHome ] = useState<boolean>(true);
	const [ isBiLike, setIsBiLike ] = useState<boolean>(false);
	const [ isQuestion, setIsQuestion ] = useState<boolean>(false);
	const [ isSignIn, setIsSignIn ] = useState<boolean>(false);
	const [ isHide, setIsHide ] = useState<boolean>(false);
	const [ isLogIn, setIsLogIn] = useState<boolean>(false);
	const [ isSideBar, sestIsSideBar ] = useState<boolean>(false);

	const isHomeClicked = () => {		
		setIsHide(false)
		setIsQuestion(false)
		setIsBiLike(false)
		setIsSignIn(false)
		setIsHome(true)
	}
	const isBiLikeClicked = () => {
		setIsHide(false)
		setIsQuestion(false)
		setIsHome(false)
		setIsSignIn(false)
		setIsBiLike(true)
	}
	const isQuestionClicked = () => {
		setIsHide(false)
		setIsBiLike(false)
		setIsHome(false)
		setIsSignIn(false)
		setIsQuestion(true)
	}
	const isSignInClicked = () => {
		setIsLogIn(!isLogIn)
	}
	const isSideBarClicked = () => {
		sestIsSideBar(!isSideBar)
	}


  return (
		<div className='menu-container'>
			<div className='menu-list-container'>
				<ul className='menu-list'>
					<li onClick={isHomeClicked} className={isHome?'active':''}>
						<NavLink to='/'>
							<div className='menu-icon'><BiLike/></div>
							<div className='menu-text'>홈페이지</div>
							<div className={isHide||!isHome?'':'indicator'}></div>
						</NavLink>
					</li>
					<li onClick={isBiLikeClicked} className={isBiLike?'active':''}>
						<NavLink to='/rBoard'>
							<div className='menu-icon'><BiLike/></div>
							<div className='menu-text'>추천게시판</div>
							<div className={isHide||!isBiLike?'':'indicator'}></div>
						</NavLink>
					</li>
					<li onClick={isQuestionClicked} className={isQuestion?'active':''} >
						<NavLink to='/qBoard'>
							<div className='menu-icon'><AiOutlineQuestionCircle/></div>
							<div className='menu-text'>질문게시판</div>
							<div className={isHide||!isQuestion?'':'indicator'}></div>
						</NavLink>
					</li>
					<li onClick={isSignInClicked}>
					{isLogIn?
						<a href='#'>
							<div className='menu-icon'><FiUserX/></div>
							<div className='menu-text'>로그인</div>						
							{/* <div className={isHide||!isSignIn?'':'indicator'}></div> */}
						</a>:
						<a href='#'>
							<div className='menu-icon'><FiUser/></div>
							<div className='menu-text'>로그아웃</div>						
							{/* <div className={isHide||!isSignIn?'':'indicator'}></div> */}
						</a>
					}
					</li>
					<li>
					  {isLogIn?'':<FaBars onClick={isSideBarClicked} className='menu-icon menu-myinfo'></FaBars>}
						
					</li>
				</ul>
			</div>
			{isSideBar? <UserSideBar isSideBarClose={isSideBarClicked}/> : ''}
		</div>
  );
}

export default Menu