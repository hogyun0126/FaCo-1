import React, { useEffect, useState } from "react";
import { BiLike  } from "react-icons/bi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiUser, FiUserX, FiUserPlus, FiUserMinus } from "react-icons/fi";
import { listenerCount } from 'process';


function Menu() {

	const [ isHome, setIsHome ] = useState(true);
	const [ isBiLike, setIsBiLike ] = useState(false);
	const [ isQuestion, setIsQuestion ] = useState(false);
	const [ isSignIn, setIsSignIn ] = useState(false);
	const [ isHide, setIsHide ] = useState(false);
	const [ isLogIn, setIsLogIn] = useState(false);

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
	

  return (
		<div className='menu-container'>
			<div className='menu-list-container'>
				<ul className='menu-list'>
					<li onClick={isHomeClicked} className={isHome?'active':''}>
						<a href='#'>
							<div className='menu-icon'><BiLike/></div>
							<div className='menu-text'>홈페이지</div>
							<div className={isHide||!isHome?'':'indicator'}></div>
						</a>
					</li>
					<li onClick={isBiLikeClicked} className={isBiLike?'active':''}>
						<a href='#'>
							<div className='menu-icon'><BiLike/></div>
							<div className='menu-text'>추천게시판</div>
							<div className={isHide||!isBiLike?'':'indicator'}></div>
						</a>
					</li>
					<li onClick={isQuestionClicked} className={isQuestion?'active':''} >
						<a href='#'>
							<div className='menu-icon'><AiOutlineQuestionCircle/></div>
							<div className='menu-text'>질문게시판</div>
							<div className={isHide||!isQuestion?'':'indicator'}></div>
						</a>
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
				</ul>
			</div>
		</div>
  );
}

export default Menu