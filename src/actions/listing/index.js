// @ts-nocheck
import API from 'constants/api';
import * as Types from 'constants/actionTypes';

export function fetchFoodList() {
  return (dispatch) => {
    dispatch({type: Types.FETCH_FOODS_REQUEST});
    return fetch(`${API.FETCH_FOODS}`)
      .then((res) => res.json())
      .then((body) => {
        dispatch({
          type: Types.FETCH_FOODS_SUCCESS,
          payload: body,
        });
      })
      .catch((ex) => dispatch({type: Types.FETCH_FOODS_FAIL}));
  };
}
