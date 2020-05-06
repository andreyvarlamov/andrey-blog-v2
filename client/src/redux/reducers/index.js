import { combineReducers } from "redux";

import postReducers from "./postReducers";
import errorReducers from "./errorReducers";

export default combineReducers({
  post: postReducers,
  error: errorReducers,
});
