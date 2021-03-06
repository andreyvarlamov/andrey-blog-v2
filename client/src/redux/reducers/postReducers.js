import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  SET_FILTER,
  REMOVE_FILTER,
} from "../actions/types";

const initialState = {
  posts: [],
  loading: false,
  filter: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filter: null,
      };
    default:
      return state;
  }
}
