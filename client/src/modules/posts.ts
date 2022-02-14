// type
const R_BOARD_LTS = 'posts/R_BOARD_LTS' as const;
const Q_BOARD_LTS = 'posts/Q_BOARD_LTS' as const;

export type QBoardPost = {
  [key: string]: number | string | null;
  id: number;
  title: string;
  weather: string;
  location: string;
  writer: string;
  createdAt: number;
  body: string;
  img: string | null;
};

export type RBoardPost = QBoardPost & {
  like: number;
  img: string;
}

// action

export const rBoardLts = (arr: RBoardPost[]) => {
  return {
    type: R_BOARD_LTS,
    payload: arr
  }
}

export const qBoardLts = (arr: QBoardPost[]) => {
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
  rLts: RBoardPost[];
  qLts: QBoardPost[];
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
