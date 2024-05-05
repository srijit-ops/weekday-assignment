// reducer.js

import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../action/actionTypes';

const initialState = {
  loading: false,
  data: [],
  error: null
};

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_DATA_SUCCESS:
      console.log(action.payload.jdList)
      return {
        ...state,
        loading: false,
        data: [...state.data,...action.payload.jdList],
        error: null
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload
      };
    default:
      return state;
  }
};

