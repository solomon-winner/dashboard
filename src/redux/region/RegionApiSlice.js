import { apiSlice } from '../app/api/apiSlice';

export const RegionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRegion: builder.query({
            query: () => ({
                url: "/regions",
                method: "GET",
                params: {
                    page: 1,
                    per_page: 20,
                }
            })
        }),
        addRegion: builder.mutation({
            query: (data) => ({
                url: "/regions",
                method: "POST",
                body: data     
            })
        }),
        getWeredaByRegion: builder.query({
            query: (id) => ({
                url: `/regions/${id}/woredas`,
                method: "GET",
            })
        })
    }),
})

export const { useGetRegionQuery, useAddRegionMutation, useGetWeredaByRegionQuery } = RegionApiSlice