// type
const USER_INFO = 'userInfo/USER_INFO' as const;

export type userInfoType = {
    // id: string
    name: string,
    phone: any,
    email: string,
    location: string,
    sex: string
};

// action
export const userInfo = (obj: userInfoType) => {
  return {
    type: USER_INFO,
    payload: obj
  }
}

// action type
type UserInfoAction = 
  |ReturnType<typeof userInfo>

// state type
type UserInfoState = {
  [key: string]: userInfoType;
  userInfo: userInfoType;
}

const initialState: UserInfoState = {
  userInfo: {
    // id: '',
    name: '',
    phone: '',
    email: '',
    location: '',
    sex: ''
  }
}


// reducer
function userInfoReducer(
  state: UserInfoState = initialState,
  action: UserInfoAction
): UserInfoState {
  switch (action.type) {
    case USER_INFO:
      return Object.assign({}, state, { userInfo : action.payload });
    default:
      return state;
  }
}

export default userInfoReducer;
