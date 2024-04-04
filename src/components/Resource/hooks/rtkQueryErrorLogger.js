import { isRejected } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    if (isRejected(action)) {
       if (action.payload?.status === 401) {
         console.log("error auth");
       }
    }
    return next(action);
   };
export default rtkQueryErrorLogger; // Export the function
