import listingReducer from 'reducers/listing';
import * as Types from 'constants/actionTypes';
import expect from 'expect';

describe('Initial state', () => {
  it('should return the initial state', () => {
    expect(listingReducer(undefined, {})).toEqual({
      fetchingFoods: false,
      allFoods: null,
    });
  });

  it('should handle FETCH_FOODS_REQUEST', () => {
    expect(
      listingReducer(
        {},
        {
          type: Types.FETCH_FOODS_REQUEST,
        },
      ),
    ).toEqual({fetchingFoods: true});
  });
  const data = [];

  it('should handle FETCH_FOODS_SUCCESS', () => {
    expect(
      listingReducer([], {
        type: Types.FETCH_FOODS_SUCCESS,
        allFoods: data,
      }),
    ).toEqual({fetchingFoods: false});
  });

  it('should handle FETCH_FOODS_FAIL', () => {
    expect(
      listingReducer([], {
        type: Types.FETCH_FOODS_FAIL,
      }),
    ).toEqual({
      fetchingFoods: false,
    });
  });
});
