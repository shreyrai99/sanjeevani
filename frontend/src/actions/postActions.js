import axios from "axios";
import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DETAILS_RESET,
  POST_UNLIKE_REQUEST,
  POST_UNLIKE_SUCCESS,
  POST_UNLIKE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_RESET,
  POST_COMMENT_CREATE_REQUEST,
  POST_COMMENT_CREATE_SUCCESS,
  POST_COMMENT_CREATE_FAIL,
  POST_COMMENT_CREATE_RESET,
  POST_COMMENT_DELETE_REQUEST,
  POST_COMMENT_DELETE_SUCCESS,
  POST_COMMENT_DELETE_FAIL,
  POST_COMMENT_DELETE_RESET
} from "../constants/postConstants";

export const listPosts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    //getState() can access global states
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/posts`, config);

    dispatch({ type: POST_LIST_SUCCESS, payload: data });
    // if fails then failure is dispatched in catch block
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const listPostDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });

    //getState() can access global states
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/posts/${id}`, config); //POST id to which req is being made

    dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
    // if fails then failure is dispatched in catch block
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const addLike = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_LIKE_REQUEST });

    //getState() can access global states
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`/api/posts/${postId}/like`, {}, config);

    dispatch({ type: POST_LIKE_SUCCESS, payload: data });
    dispatch(listPosts());
    // if fails then failure is dispatched in catch block
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const removeLike = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UNLIKE_REQUEST });

    //getState() can access global states
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(
      `/api/posts/${postId}/unlike`,
      {},
      config
    );

    dispatch({ type: POST_UNLIKE_SUCCESS, payload: data });
    dispatch(listPosts());
    // if fails then failure is dispatched in catch block
  } catch (error) {
    dispatch({
      type: POST_UNLIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deletePost = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });

    //getState() can access global states
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/posts/${postId}`, config);

    dispatch({ type: POST_DELETE_SUCCESS });
    dispatch(listPosts());
    // if fails then failure is dispatched in catch block
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const createPost = post => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

    //getState() can access global states
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`/api/posts`, post, config);

    dispatch({ type: POST_CREATE_SUCCESS, payload: data });
    dispatch(listPosts());
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const commentCreatePost = (comment, postId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: POST_COMMENT_CREATE_REQUEST });

    //getState() can access global states
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(
      `/api/posts/${postId}/comment`,
      comment,
      config
    );

    dispatch({ type: POST_COMMENT_CREATE_SUCCESS, payload: data });
    dispatch(listPostDetails(postId));
  } catch (error) {
    dispatch({
      type: POST_COMMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deleteCommentPost = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: POST_COMMENT_DELETE_REQUEST });

    //getState() can access global states
    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/posts/${postId}/comment/${commentId}`, config);

    dispatch({ type: POST_COMMENT_DELETE_SUCCESS });
    dispatch(listPostDetails(postId));
    // if fails then failure is dispatched in catch block
  } catch (error) {
    dispatch({
      type: POST_COMMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
