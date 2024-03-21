import { apiSlice } from "../app/api/apiSlice";

export const passwordApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      changePassword: builder.mutation({
        query: (passwordData) => ({
          url:'/change-password',
          method: 'POST',
          body: passwordData,
        })
      })
    }),
  });
  
  export const {useChangePasswordMutation} = apiSlice;