import React, { useEffect, useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

type MyProps = {
	isSideBarClose: ()=>void;
}


function UserSideBar({ isSideBarClose } : MyProps) {
  
  return (
    <div className='side-container'>
      <AiOutlineClose onClick={isSideBarClose}></AiOutlineClose>
			<ul className='side-ul'>
        <li>
          내정보
        </li>
      </ul>
    </div>
  )
}

export default UserSideBar