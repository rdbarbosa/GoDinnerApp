import { combineReducers } from "redux";

import token from "./token";
import restaurants from "./restaurants";

export default combineReducers({
  token,
  restaurants
});
