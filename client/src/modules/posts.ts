// type
const R_BOARD_LTS = 'posts/R_BOARD_LTS' as const;
const Q_BOARD_LTS = 'posts/Q_BOARD_LTS' as const;

export type postType = {
  [key: string]: number | string | null;
  id: number;
  title: string;
  weather: string;
  location: string;
  writer: string;
  createdAt: number;
  body: string;
  img: string | null;
  like: number;
};

// action
export const rBoardLts = (arr: postType[]) => {
  return {
    type: R_BOARD_LTS,
    payload: arr
  }
}

export const qBoardLts = (arr: postType[]) => {
  return {
    type: Q_BOARD_LTS,
    payload: arr
  }
}

// action type
type PostsAction = 
  |ReturnType<typeof rBoardLts>
  |ReturnType<typeof qBoardLts>;

// state type
type PostsState = {
  [key: string]: postType[];
  rLts: postType[];
  qLts: postType[];
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
  switch (action.type) {
    case R_BOARD_LTS:
      return Object.assign({}, state, { rLts : action.payload });
    case Q_BOARD_LTS:
      return Object.assign({}, state, { qLts : action.payload });
    default:
      return state;
  }
}

export default postsReducer;
