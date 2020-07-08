import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return { ...state, isAuthenticated: true, loading: false };
    case LOGOUT:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return { ...state, token: null, isAuthenticated: false, loading: false, user: null };
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: action.payload };
    default:
      return state;
  }
}