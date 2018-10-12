import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  updateType: ["orderType"],
  updateOrder: ["order"],
  clearOrder: [],
  addOption: ["id"],
  removeOption: ["id"]
});

/**
 * Handlers
 */
const INITIAL_STATE = {
  order_type: "",
  client: {},
  restaurant: {},
  restaurant_table: {},
  restaurant: {},
  menu_options: []
};

const update = (state = INITIAL_STATE, action) =>
  (state = { ...state, ...action.order });
const clear = (state = INITIAL_STATE, action) => (state = INITIAL_STATE);
const addOption = (state = INITIAL_STATE, action) => {
  let array = [...state.menu_options];
  array.push(action.id);
  return {
    ...state,
    menu_options: array
  };
};
const removeOption = (state = INITIAL_STATE, action) => {
  let array = [...state.menu_options];
  array.splice(array.findIndex(v => v === action.id), 1);
  return {
    ...state,
    menu_options: array
  };
};
const updateType = (state = INITIAL_STATE, action) => ({
  ...state,
  order_type: action.orderType
});

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.UPDATE_ORDER]: update,
  [Types.CLEAR_ORDER]: clear,
  [Types.ADD_OPTION]: addOption,
  [Types.REMOVE_OPTION]: removeOption,
  [Types.UPDATE_TYPE]: updateType
});
