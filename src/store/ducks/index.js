import { combineReducers } from "redux";

import token from "./token";
import restaurants from "./restaurants"
import client from "./client"
export default combineReducers({
  token,
  restaurants,
  client
});
