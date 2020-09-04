/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionTypes';

const INITIAL_STATE = {
  fetchingFoods: false,
  allFoods: null,
};
function listingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.FETCH_FOODS_REQUEST:
      return Object.assign({}, state, {
        fetchingFoods: true,
      });
    case Types.FETCH_FOODS_SUCCESS:
      return Object.assign({}, state, {
        fetchingFoods: false,
        allFoods: action.payload,
      });
    case Types.FETCH_FOODS_FAIL:
      return Object.assign({}, state, {
        fetchingFoods: false,
      });

    case Types.LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
export default listingReducer;
