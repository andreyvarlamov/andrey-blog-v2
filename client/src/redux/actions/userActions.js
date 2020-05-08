import axios from "axios";

import { GET_USER_LIST, USER_LIST_LOADING } from "./types";

import { returnErrors } from "./errorActions";

export const getUserList = () => dispatch => {
  dispatch(setUserListLoading());

  axios
    .get("/api/users")
    .then(res =>
      dispatch({
        type: GET_USER_LIST,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setUserListLoading = () => {
  return {
    type: USER_LIST_LOADING,
  };
};
