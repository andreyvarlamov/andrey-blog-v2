import { GET_USER_LIST, USER_LIST_LOADING } from "../actions/types";

const initialState = {
  users: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case USER_LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
