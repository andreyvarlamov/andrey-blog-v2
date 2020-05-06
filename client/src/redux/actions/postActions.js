import axios from "axios";

import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING } from "./types";

import { returnErrors } from "./errorActions";

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());

  axios
    .get("/api/posts")
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

export const addPost = post => dispatch => {
  axios
    .post("/api/posts", post)
    .then(res => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
      dispatch(getPosts());
    })
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "NEW_POST_FAIL")
      )
    );
};

export const deletePost = id => dispatch => {
  axios
    .delete("/api/posts/" + id)
    .then(res => {
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      dispatch(getPosts());
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
