import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { setCredentials, logOut, updateToken, setIsRefreshingToken } from "../../auth/authSlice";
import { log } from "../../../components/Resource/Utility/Logger";

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
  log(result);
  if (result.error?.status === "FETCH_ERROR") {
    toast.error("No internet connection");
  } else if (result.error?.status === 401) {
    log("unauthorized");
    const refreshToken = api.getState().auth.refresh_token;
    log(refreshToken);
    if (refreshToken &&!api.getState().auth.isRefreshingToken) {
      api.dispatch(setIsRefreshingToken(true));
      const refreshResult = await baseQuery(
        {
          url: "/refresh-token",
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions
      );
      if (refreshResult?.data) {
        const { user } = api.getState().auth;
        api.dispatch(updateToken({ ...refreshResult.data, user }));
        result = await baseQuery(args, api, { ...otherOptions, signal }); // Retry with new access token
        api.dispatch(setIsRefreshingToken(false));
      } else {
        api.dispatch(logOut());
        api.dispatch(setIsRefreshingToken(false));
      }
    }
  } else {
    // Check if there's an error object in the response
    if (result.error && result.error.data.errors) {
      // Combine the first error message and the second error message into a single string
      // const errorMessage = `${result.error.data.message} :-  ${result.error.data.errors.error}`;
      // toast.error(errorMessage);
      toast.error(
        <div>
          <p className="font-bold text-lg">{result?.error?.data?.message}</p>
          <p className="text-sm">{JSON.stringify(result?.error?.data?.errors)}</p>
        </div>
      )
    } else {
      // If there's no error object, just display the message
      toast.error(result?.error?.data?.message);
    }
  }

  return result;
};
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
