import axios from "axios";
import { BASE_URL } from "../../utilities/api";

/**
 * @param {String} url - api to call(required)
 * @param {ActionType} identifier - unique action type(required)
 * @param {Object} params - params object
 * @param {String} method - GET or POST
 * @param {String} successMsg - message that we want to save in success case
 * @param {String} errorMsg - message that we want to save in error case
 */

const genericActionCreator = (
   url,
   identifier,
   params = {},
   method = "GET",
   successMsg = (method === "GET" ? "Data Fetched" : "Action Completed") + " Successfully!",
   errorMsg = "Something Went Wrong!"
) => {
   return async (dispatch) => {
      dispatch({
         type: `${identifier}_INIT`,
         payload: {
            data: [],
            isLoading: true,
            message: "",
         },
      });
      try {
         const result = await axios({
            baseURL: BASE_URL,
            url,
            method,
            params: { ...params },
         });
         const data = result?.data ?? [];
         let success = false;
         if (
            data &&
            Array.isArray(data) &&
            (data || []).length > 0 &&
            (result?.status ?? 0) === 200
         ) {
            success = true;
         }
         dispatch({
            type: `${identifier}_SUCCESS`,
            payload: {
               data,
               success,
               isLoading: false,
               message: successMsg,
            },
         });
      } catch (error) {
         dispatch({
            type: `${identifier}_FAILURE`,
            payload: {
               data: [],
               isLoading: false,
               message: errorMsg,
            },
         });
      }
   };
};

export default genericActionCreator;

// 1. It's a common action creator that can be used to make any api call.
// 2. It expects a unique identifier as action type and then it appends "INIT", "SUCCESS" and  "FAILURE" type to that identifier.
// 3. You don't need to write a reducer for this just call the genericReducer in reducers/index.js and pass it in combineReducers
