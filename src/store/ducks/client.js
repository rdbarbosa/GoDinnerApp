import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  updateClient: ["client"]
});

/**
 * Handlers
 */
const INITIAL_STATE = {};

const update = (state = INITIAL_STATE, action) => (state = action.client);

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.UPDATE_CLIENT]: update,
});
