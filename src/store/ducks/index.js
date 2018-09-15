import { combineReducers } from "redux";

import token from "./token";
<<<<<<< HEAD
import restaurants from "./restaurants";

export default combineReducers({
  token,
  restaurants
=======
import restaurants from "./restaurants"
import client from "./client"
export default combineReducers({
  client,
  restaurants,
  token,
>>>>>>> a00597fe1f1d93436a1a1ec5f9f275d7ec40021a
});
