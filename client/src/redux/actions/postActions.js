import axios from "axios";

import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  SET_FILTER,
  REMOVE_FILTER,
} from "./types";

import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getPosts = filter => dispatch => {
  dispatch(setPostsLoading());

  let params = {};

  if (filter)
    params = {
      postedBy: filter.id,
    };

  axios
    .get("/api/posts", { params })
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    payload: filter,
  };
};

export const removeFilter = () => {
  return {
    type: REMOVE_FILTER,
  };
};

export const addPost = (post, filter) => (dispatch, getState) => {
  axios
    .post("/api/posts", post, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
      dispatch(getPosts(filter));
    })
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "NEW_POST_FAIL")
      )
    );
};

export const deletePost = (id, filter) => (dispatch, getState) => {
  axios
    .delete("/api/posts/" + id, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      dispatch(getPosts(filter));
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};
