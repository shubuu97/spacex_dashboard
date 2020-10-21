// In order to use genericActionCreator and genericReducer, just call the genericReducer with unique actionType (make sure the actionType passed here should match with the actionType used to call the genericActionCreator) and pass the variable in the combineReducers

import { combineReducers } from "redux";
import launchDetail from "./launchDetail";
import genericReducer from "./genericReducer";
import { FETCH_LAUNCHES } from "../actionTypes";

const launches = genericReducer(FETCH_LAUNCHES);

export default combineReducers({
   launches,
   launchDetail,
});
