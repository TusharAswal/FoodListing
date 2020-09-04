// @ts-nocheck
import API from 'constants/api';
import RestClient from 'utils/restClient';
import * as Types from 'constants/actionTypes';
export function fetchFoodList() {
  return async (dispatch) => {
    dispatch({type: Types.FETCH_FOODS_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.FETCH_FOODS}`);
      if (response) {
        console.log('FETCH_FOODS_SUCCESS', response);
        dispatch({
          type: Types.FETCH_FOODS_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({type: Types.FETCH_FOODS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.FETCH_FOODS_FAIL});
    }
  };
}
