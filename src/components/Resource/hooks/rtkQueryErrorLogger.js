import { isRejected } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
   
    if (isRejected(action)) {
       if (action.payload?.status === 401) {
         if (localStorage.getItem('reloadTriggered') === 'false') {
            console.log("error auth");
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // Set the reload flag to true
            localStorage.setItem('reloadTriggered', 'true');
            window.location.reload();
        }
       }
    }
    return next(action);
   };
export default rtkQueryErrorLogger; // Export the function
