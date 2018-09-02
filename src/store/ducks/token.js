import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  setToken: ["token"],
  getToken: [],
  removeToken: []
});

/**
 * Handlers
 */
const INITIAL_STATE = "";

const add = (state = INITIAL_STATE, action) => (state = action.token);

const get = (state = INITIAL_STATE, action) => state;

const remove = (state = INITIAL_STATE, action) => (state = "");

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.SET_TOKEN]: add,
  [Types.GET_TOKEN]: get,
  [Types.REMOVE_TOKEN]: remove
});
