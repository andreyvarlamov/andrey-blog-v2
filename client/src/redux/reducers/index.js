import { combineReducers } from "redux";

import postReducers from "./postReducers";
import errorReducers from "./errorReducers";
import authReducers from "./authReducers";
import userReducers from "./userReducers";

export default combineReducers({
  post: postReducers,
  error: errorReducers,
  auth: authReducers,
  user: userReducers,
});
