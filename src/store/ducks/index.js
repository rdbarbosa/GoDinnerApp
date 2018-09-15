import { combineReducers } from "redux";

import token from "./token";
import restaurants from "./restaurants"
import client from "./client"
export default combineReducers({
  client,
  restaurants,
  token,
});
