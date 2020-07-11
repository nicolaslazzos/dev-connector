import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_PROFILES, GET_REPOS } from '../actions/types';

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return { ...state, profile: action.payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };
    case GET_PROFILES:
      return { ...state, profiles: action.payload, loading: false };
    case GET_REPOS:
      return { ...state, repos: action.payload, loading: false };
    default:
      return state;
  }
}