/**
 *
 * @param {ActionType} identifier - unique action type(required)
 */

function GenericReducer(identifier) {
   return (state = {}, action) => {
      const { type, payload } = action || {};
      switch (type) {
         case `${identifier}_INIT`:
            return {
               ...state,
               type,
               ...payload,
            };
         case `${identifier}_SUCCESS`:
            return {
               ...state,
               type,
               ...payload,
            };
         case `${identifier}_FAILURE`:
            return {
               ...state,
               type,
               ...payload,
            };
         default:
            return state;
      }
   };
}

export default GenericReducer;
