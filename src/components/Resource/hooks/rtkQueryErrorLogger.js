import { isRejected } from "@reduxjs/toolkit";
import { logOut, updateToken } from "../../../redux/auth/authSlice";
import { baseQuery } from "../../../redux/app/api/apiSlice";

export const rtkQueryErrorLogger = (api) => (next) => async (action) => {
  if (isRejected(action)) {
    if (action.payload?.status === 401) {
      const refreshToken = api.getState().auth.refresh_token;
      console.log(refreshToken);
      if(!refreshToken) return next(action)
      const refreshResult = await baseQuery(
        { url: "/refresh-token", method: "POST", body: { refreshToken } },
        api
      );
      if (refreshResult?.data) {
        console.log(refreshResult.data);
        // api.dispatch(updateToken(refreshResult.data.token));
      } else {
        api.dispatch(logOut());
      }
      //    if (localStorage.getItem('reloadTriggered') === 'false') {
      //       console.log("error auth");
      //       localStorage.removeItem('user');
      //       localStorage.removeItem('accessToken');
      //       localStorage.removeItem('refreshToken');
      //       // Set the reload flag to true
      //       localStorage.setItem('reloadTriggered', 'true');
      //       window.location.reload();
      //   }
    }
  }
  return next(action);
};
export default rtkQueryErrorLogger; // Export the function
