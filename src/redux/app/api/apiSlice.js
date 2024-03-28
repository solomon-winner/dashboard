import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { setCredentials, logOut } from '../../auth/authSlice';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://tbrr.echnoserve.com/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 'FETCH_ERROR') {
    toast.error('No internet connection');
  } else if (result.error?.originalStatus
    === 403) {
    // send a refresh token to new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
  //  const UserData = await baseQuery('/')
    if (refreshResult?.data) {
      const { user } = api.getState().auth;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { toast } from 'react-toastify';
// import { setCredentials, logOut } from '../../auth/authSlice';

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://tbrr.echnoserve.com/api',
//   credentials: 'include',
//   prepareHeaders: (headers, { getState }) => {
//     const { token } = getState().auth;
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   const { signal, ...otherOptions } = extraOptions || {}; // Destructure signal from extraOptions

//   let result = await baseQuery(args, api, { ...otherOptions, signal }); // Pass signal in the options

//   if (result.error?.status === 'FETCH_ERROR') {
//     toast.error('No internet connection');
//   } else if (result.error?.originalStatus === 403) {
//     const refreshResult = await baseQuery('/refresh', api, extraOptions);
//     if (refreshResult?.data) {
//       const { user } = api.getState().auth;
//       api.dispatch(setCredentials({ ...refreshResult.data, user }));
//       result = await baseQuery(args, api, { ...otherOptions, signal }); // Retry with new access token
//     } else {
//       api.dispatch(logOut());
//     }
//   }
//   return result;
// };

// export const apiSlice = createApi({
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({}),
// });
