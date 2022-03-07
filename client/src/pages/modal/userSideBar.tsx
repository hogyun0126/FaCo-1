import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';
import LocaList from '../Component/location';
import { RootState } from '../../modules';

import { AiOutlineClose } from "react-icons/ai";

  type MyProps = {
    isSideBarClose: ()=>void;
  }


function UserSideBar({ isSideBarClose } : MyProps) {
  
  return (
    <div className='side-container'>
      <AiOutlineClose onClick={isSideBarClose}></AiOutlineClose>
			<ul className='side-ul'>
        <li onClick={isSideBarClose}>
          <NavLink to='/myInfo'>
            내정보   
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default UserSideBar