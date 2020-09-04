// @ts-nocheck
import {combineReducers} from 'redux';
import listingReducer from './listing';

const applicationReducer = combineReducers({
  listingReducer,
});

export default applicationReducer;
