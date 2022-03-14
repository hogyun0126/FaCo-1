// type
const R_BOARD_LTS = 'posts/R_BOARD_LTS' as const;
const Q_BOARD_LTS = 'posts/Q_BOARD_LTS' as const;
const INCREASE_LIKE = 'post/INCREASE_LIKE' as const;
const DECREASE_LIKE = 'post/DECREASE_LIKE' as const;

export type Img = {
  name: string;
  url: string;
}

export type PostType = {
  [key: string]: Img[] | number | string;
  id: number;
  type: string;
  title: string;
  weather: string;
  location: string;
  writer: string;
  createdAt: number;
  body: any;
  img: Img[];
  like: number;
};

// action
export const rBoardLts = (arr: PostType[]) => {
  return {
    type: R_BOARD_LTS,
    payload: arr
  }
}

export const qBoardLts = (arr: PostType[]) => {
  return {
    type: Q_BOARD_LTS,
    payload: arr
  }
}

export const increaseLike = (id: number, type: string) => {
  return {
    type: INCREASE_LIKE,
    payload: {
      id,
      type,
    }
  }
}

export const decreaseLike = (id: number, type: string) => {
  return {
    type: DECREASE_LIKE,
    payload: {
      id,
      type,
    }
  }
}

// action type
type PostsAction = 
  |ReturnType<typeof rBoardLts>
  |ReturnType<typeof qBoardLts>
  |ReturnType<typeof increaseLike>
  |ReturnType<typeof decreaseLike>

// state type
type PostsState = {
  [key: string]: PostType[];
  rLts: PostType[];
  qLts: PostType[];
}

// state
const initialState: PostsState = {
  rLts: [],
  qLts: [],
}

// reducer
function postsReducer(
  state: PostsState = initialState,
  action: PostsAction
): PostsState {
  function likeChange(postType: string, id: number, actionType: string) {
    const postT = postType + 'Lts';
    const index = state[postT].findIndex(item => item.id === id);
  
    if (actionType === INCREASE_LIKE) {
      state[postT][index].like++;
    } 
    if (actionType === DECREASE_LIKE) {
      state[postT][index].like--;
    }
  
    return state;
  }


  switch (action.type) {
    case R_BOARD_LTS:
      return Object.assign({}, state, { rLts : action.payload });
    case Q_BOARD_LTS:
      return Object.assign({}, state, { qLts : action.payload });
    case INCREASE_LIKE:
      return Object.assign({}, likeChange(action.payload.type, action.payload.id, INCREASE_LIKE));
    case DECREASE_LIKE:
      return Object.assign({}, likeChange(action.payload.type, action.payload.id, DECREASE_LIKE));
    default:
      return state;
  }
}

export default postsReducer;
