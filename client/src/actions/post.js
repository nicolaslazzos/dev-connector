import axios from 'axios';
import { setAlert } from './';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from './types';

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
};

export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
};

export const postLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({ type: UPDATE_LIKES, payload: { id, likes: res.data } });
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
};

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({ type: DELETE_POST, payload: id });

    dispatch(setAlert('The post was deleted successfully', 'success'));
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
};

export const addPost = formData => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  try {
    const res = await axios.post(`/api/posts/`, formData, config);

    dispatch({ type: ADD_POST, payload: res.data });

    dispatch(setAlert('Post created successfully', 'success'));
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
};

export const addComment = (postId, formData) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

    dispatch({ type: ADD_COMMENT, payload: res.data });

    dispatch(setAlert('Comment added successfully', 'success'));
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({ type: REMOVE_COMMENT, payload: commentId });

    dispatch(setAlert('Comment removed successfully', 'success'));
  } catch (error) {
    dispatch({ type: POST_ERROR, payload: { msg: error.response.statusText, status: error.response.status } });
  }
};