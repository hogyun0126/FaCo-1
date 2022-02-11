import React, { ChangeEvent, InputHTMLAttributes } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { update } from "../modules/test";

function ReduxTest() {
  const state = useSelector((state: RootState) => state.testReducer);
  const text = state.text;
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(update(e.target.value));
    // console.log(state)
  }

  return (
    <div>
      <div>state : {text}</div>
      <input type='text' onChange={handleInputChange}/>
    </div>
  )
}

export default ReduxTest;
