import { apiSlice } from "../app/api/apiSlice";

export const ActivityApi =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Activity: builder.query({
        query: (page) => ({
          url:`/user-activity?page=${page}`,
          method: 'GET',
        })
      })
    }),
  });
  
  export const {useActivityQuery} = ActivityApi;

