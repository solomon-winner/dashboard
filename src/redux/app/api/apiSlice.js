import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { setCredentials, logOut } from "../../auth/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://tbrr.echnoserve.com/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const { signal, ...otherOptions } = extraOptions || {}; // Destructure signal from extraOptions

  let result = await baseQuery(args, api, { ...otherOptions, signal }); // Pass signal in the options
console.log(result);
  if (result.error?.status === "FETCH_ERROR") {
    toast.error("No internet connection");
  } else if (result.error?.status === 401) {
    console.log("unauthorized");
    const refreshToken = api.getState().auth.refresh_token;
    if(refreshToken){
    const refreshResult = await baseQuery(
      { url: "/refresh-token", method: "POST", body: { refresh_token: refreshToken } },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const { user } = api.getState().auth;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, { ...otherOptions, signal }); // Retry with new access token
    } else {
      api.dispatch(logOut());
    }
    }
  } else {
    toast.error(result?.error?.data?.message);
  }

  return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
