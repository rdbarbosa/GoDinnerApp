import { combineReducers } from "redux";

import token from "./token";
import restaurants from "./restaurants";
import client from "./client";
import order from "./order";
export default combineReducers({
  client,
  restaurants,
  order,
  token,
});
