import { apiSlice } from '../app/api/apiSlice';

export const ResourceApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getResourceByType: builder.query({
            query: (type) => ({
                url: `/resources/type/${type}`,
                method: "GET",
            })
        }),
        addResource: builder.mutation({
            query: (data) => ({
                url: "/resources",
                method: "POST",
                body: data     
            })
        }),
    }),
})

export const { useGetResourceByTypeQuery, useAddResourceMutation } = ResourceApiSlice