import _, { map } from "lodash";
import jsonPlaceHolder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

// Action creator
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceHolder.get("./posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// Action creator
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceHolder.get(`./users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};
