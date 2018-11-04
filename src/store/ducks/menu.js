import { createActions, createReducer } from "reduxsauce";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({
  openMenu: [],
  closeMenu: [],
  initMenu: ["drawer"]
});

/**
 * Handlers
 */
const INITIAL_STATE = {
  open: false,
  drawer: null
};

const init = (state = INITIAL_STATE, { drawer }) => ({
  drawer: drawer
});
const open = (state = INITIAL_STATE, action) => {
  if (state.drawer) {
    state.drawer._root.open();
  }
  return {
    open: true,
    ...state
  };
};

const close = (state = INITIAL_STATE, action) => {
  if (state.drawer) {
    state.drawer._root.close();
  }
  return {
    open: false,
    ...state
  };
};
/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.OPEN_MENU]: open,
  [Types.CLOSE_MENU]: close,
  [Types.INIT_MENU]: init,
});
