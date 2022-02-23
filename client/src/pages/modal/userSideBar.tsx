import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes } from 'react-router-dom';

import { AiOutlineClose } from "react-icons/ai";

type MyProps = {
	isSideBarClose: ()=>void;
}


function UserSideBar({ isSideBarClose } : MyProps) {
  
  return (
    <div className='side-container'>
      <AiOutlineClose onClick={isSideBarClose}></AiOutlineClose>
			<ul className='side-ul'>
        <NavLink to='/myInfo'>
          <li>내정보</li>
        </NavLink>
      </ul>
    </div>
  )
}

export default UserSideBar