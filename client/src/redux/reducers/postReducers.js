import { GET_POSTS, ADD_POST, DELETE_POST } from "../actions/types";

import { v4 as uuid } from "uuid";

const initialState = {
  posts: [
    {
      _id: uuid(),
      title: "Post 1",
      body: "This is post 1",
      postedBy: "Poster 1",
      date: Date.now,
    },
    {
      _id: uuid(),
      title: "Post 2",
      body: "This is post 2",
      postedBy: "Poster 2",
      date: Date.now,
    },
    {
      _id: uuid(),
      title: "Post 3",
      body: "This is post 3",
      postedBy: "Poster 3",
      date: Date.now,
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
      };
    case ADD_POST:
    case DELETE_POST:
    default:
      return state;
  }
}
