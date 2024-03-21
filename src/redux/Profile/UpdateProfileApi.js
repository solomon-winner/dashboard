import { apiSlice } from "../app/api/apiSlice";

export const UpdateProfileApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      UpdateProfile: builder.mutation({
        query: (UpdatedData) => ({
          url:'/update-profile?_method=PATCH',
          method: 'POST',
          body: UpdatedData,
        })
      })
    }),
  });
  
  export const {useUpdateProfileMutation} = apiSlice;