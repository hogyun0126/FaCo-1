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
  const stateLocation = useSelector((state: RootState) => state.locationReducer.lLts);
  const locations = stateLocation.sort((a, b) => a.locationKr > b.locationKr ? 1 : -1);

  function isLocationClicked () {
    // dispatch(locationLts(Object.assign({}, )));
  }

  
  return (
    <div className='side-container'>
      <AiOutlineClose onClick={isSideBarClose}></AiOutlineClose>
			<ul className='side-ul'>
        <NavLink to='/myInfo'>
          <li>내정보</li>
        </NavLink>
        <li>
          <div>날씨</div>
          <input type='checkbox'></input>
        </li>
        <li>
        <div>지역</div>
        {/* onChange={(e) => handleInputValue(e)} */}
          <select name='location'>
          <option hidden>---</option>
          {locations.map(loca => <LocaList key={loca.id} location={loca}/>)}
          </select>
        </li>
      </ul>
    </div>
  )
}

export default UserSideBar