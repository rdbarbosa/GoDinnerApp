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
  menu_options: [],
  created_at: '',
  updated_at: '',
  total: 0
};

const update = (state = INITIAL_STATE, action) => {
   //{ ...state, ...action.order };
  let array = action.order.menu_options
  let total = array.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)

  return {
    ...state,
    ...action.order,
    total,
  }
}
const clear = (state = INITIAL_STATE, action) =>
  (state = {
    ...INITIAL_STATE,
    order_type: state.order_type
  });
const addOption = (state = INITIAL_STATE, action) => {
  let array = [...state.menu_options];
  array.push(action.id);
  let total = array.reduce((acc, curr) => acc + curr, 0)
  return {
    ...state,
    menu_options: array,
    total
  };
};
const removeOption = (state = INITIAL_STATE, action) => {
  let array = [...state.menu_options];
  array.splice(array.findIndex(v => v === action.id), 1);
  let total = array.reduce((acc, curr) => acc + curr, 0)

  return {
    ...state,
    menu_options: array,
    total,
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
