import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, profile: action.payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };
    default:
      return state;
  }
}