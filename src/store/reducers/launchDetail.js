import {
   FETCH_LAUNCH_DETAIL_INIT,
   FETCH_LAUNCH_DETAIL_SUCCESS,
   FETCH_LAUNCH_DETAIL_FAILURE,
} from "../actionTypes";

const LaunchDetail = (state = {}, action) => {
   const { type, payload } = action || {};
   switch (type) {
      case FETCH_LAUNCH_DETAIL_INIT:
         return {
            ...state,
            type,
            ...payload,
         };
      case FETCH_LAUNCH_DETAIL_SUCCESS:
         return {
            ...state,
            type,
            ...payload,
         };
      case FETCH_LAUNCH_DETAIL_FAILURE:
         return {
            ...state,
            type,
            ...payload,
         };
      default:
         return state;
   }
};

export default LaunchDetail;
