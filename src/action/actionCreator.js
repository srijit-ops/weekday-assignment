import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "./actionTypes";
import axios from "axios";

export const fetchData = (offset) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    try {
      const response = await axios.post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        {
          limit: 10,
          offset: offset,
        }
      );
      dispatch({ type: FETCH_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_DATA_FAILURE, payload: error });
    }
  };
};
