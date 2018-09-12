import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  updateRestaurants: ["restaurants"]
});

/**
 * Handlers
 */
const INITIAL_STATE = {};

const update = (state = INITIAL_STATE, action) => (state = action.restaurants);

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.UPDATE_RESTAURANTS]: update,
});
