// type
const USER_INFO = 'userInfo/USER_INFO' as const;

export type userInfoType = {
  [key: string]: number | string | null;
  id: string|null;
	password: string | number | null;
	name: string | null;
	phone: number | null;
	email: string | null;
	location: string | null;
	sex: string | null;
};

// action
export const userInfo = (arr: userInfoType[]) => {
  return {
    type: USER_INFO,
    payload: arr
  }
}

// action type
type UserInfoAction = 
  ReturnType<typeof userInfo>

// state type
type UserInfoState = {
  [key: string]: userInfoType[];
  userId: userInfoType[];
  userPassword: userInfoType[];
  userName: userInfoType[];
  userPhone: userInfoType[];
  userEmail: userInfoType[];
  userLocation: userInfoType[];
  userSex: userInfoType[];
  
}

// state
const initialState: UserInfoState = {
  userId: [],
  userPassword: [],
  userName: [],
  userPhone: [],
  userEmail: [],
  userLocation: [],
  userSex: []
}

// reducer
function userInfoReducer(
  state: UserInfoState = initialState,
  action: UserInfoAction
): UserInfoState {
  switch (action.type) {
    case USER_INFO:
      return Object.assign({}, state, { rLts : action.payload });
    default:
      return state;
  }
}

export default userInfoReducer;
