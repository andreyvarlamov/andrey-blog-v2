import axios from "axios";

import { returnErrors } from "./errorActions";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: "AUTH_ERROR" });
    });
};

// Register
export const register = ({ name, email, password, password2 }) => dispatch => {
  // Req Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Req Body
  const body = JSON.stringify({ name, email, password, password2 });

  // Send out request
  axios
    .post("/api/users", body, config)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch(loadUser());
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_ERROR")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login
export const login = ({ email, password }) => dispatch => {
  // Req Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Req Body
  const body = JSON.stringify({ email, password });

  // Send out request
  axios
    .post("/api/auth", body, config)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(loadUser());
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_ERROR")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};