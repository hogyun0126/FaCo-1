// type
const R_BOARD_POPULAR = 'posts/R_BOARD_POPULAR' as const;
const R_BOARD_LTS = 'posts/R_BOARD_LTS' as const;
const Q_BOARD_LTS = 'posts/Q_BOARD_LTS' as const;

export type QBoard = {
  title: string;
  weather: string;
  location: string;
  writer: string;
  createdAt: number;
  body: string;
  img: string | null;
};

export type RBoard = QBoard & {
  like: number;
}

// action
export const rBoardPopular = (arr: RBoard[]) => {
  return {
    type: R_BOARD_POPULAR,
    payload: arr
  }
}

export const rBoardLts = (arr: RBoard[]) => {
  return {
    type: R_BOARD_LTS,
    payload: arr
  }
}

export const qBoardLts = (arr: QBoard[]) => {
  return {
    type: Q_BOARD_LTS,
    payload: arr
  }
}

// action type
type PostsAction = 
  |ReturnType<typeof rBoardPopular>
  |ReturnType<typeof rBoardLts>
  |ReturnType<typeof qBoardLts>;

// state type
type PostsState = {
  rPopular: RBoard[];
  rLts: RBoard[];
  qLts: QBoard[];
}

// state
const initialState: PostsState = {
  rPopular: [],
  rLts: [],
  qLts: [],
}

// reducer
function postsReducer(
  state: PostsState = initialState,
  action: PostsAction
): PostsState {
  switch (action.type) {
    case R_BOARD_POPULAR:
      return Object.assign({}, state, { rPopular : action.payload });
    case R_BOARD_LTS:
      return Object.assign({}, state, { rLts : action.payload });
    case Q_BOARD_LTS:
      return Object.assign({}, state, { qLts : action.payload });
    default:
      return state;
  }
}

export default postsReducer;
