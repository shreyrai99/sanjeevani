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
  POST_COMMENT_DELETE_FAIL
} from "../constants/postConstants";

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] };
    case POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: action.payload
      };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDetailsReducer = (
  state = { post: { likes: [], comments: [] } },
  action
) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return { loading: true, ...state };
    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        post: action.payload
      };
    case POST_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case POST_DETAILS_RESET:
      return { post: {} };
    default:
      return state;
  }
};

export const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_LIKE_REQUEST:
      return { loading: true };
    case POST_LIKE_SUCCESS:
      return {
        loading: false,
        posts: action.payload
      };
    case POST_LIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postUnLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_UNLIKE_REQUEST:
      return { loading: true };
    case POST_UNLIKE_SUCCESS:
      return {
        loading: false,
        posts: action.payload
      };
    case POST_UNLIKE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return {
        loading: false
      };
    case POST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_CREATE_RESET:
      return {};
    case POST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCommentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_CREATE_REQUEST:
      return { loading: true };
    case POST_COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_COMMENT_CREATE_RESET:
      return {};
    case POST_COMMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCommentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COMMENT_DELETE_REQUEST:
      return { loading: true };
    case POST_COMMENT_DELETE_SUCCESS:
      return {
        loading: false
      };
    case POST_COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
