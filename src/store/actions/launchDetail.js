import axios from "axios";
import {
   FETCH_LAUNCH_DETAIL_INIT,
   FETCH_LAUNCH_DETAIL_SUCCESS,
   FETCH_LAUNCH_DETAIL_FAILURE,
} from "../actionTypes";
import { BASE_URL, ALL_LAUNCHES } from "../../utilities/api";

/**
 * @param {Number} flight_number //flight_number whose detail we want to fetch(required)
 */

const fetchLaunchDetail = (flight_number) => {
   if (!flight_number || typeof flight_number !== "number") {
      return;
   }
   return async (dispatch) => {
      dispatch({
         type: FETCH_LAUNCH_DETAIL_INIT,
         payload: {
            data: {},
            success: null,
            isLoading: true,
            message: "",
         },
      });
      try {
         const url = `${BASE_URL}${ALL_LAUNCHES}/${flight_number}`;
         const result = await axios(url);
         const data = result?.data ?? {};
         let success = false;
         if (data && (result?.status ?? 0) === 200) {
            success = true;
         }
         dispatch({
            type: FETCH_LAUNCH_DETAIL_SUCCESS,
            payload: {
               data,
               success,
               isLoading: false,
               message: "Launch Detail Fetched Successfully!",
            },
         });
      } catch (error) {
         dispatch({
            type: FETCH_LAUNCH_DETAIL_FAILURE,
            payload: {
               data: {},
               success: false,
               isLoading: false,
               message: "Something Went Wrong!",
            },
         });
      }
   };
};

export default fetchLaunchDetail;
