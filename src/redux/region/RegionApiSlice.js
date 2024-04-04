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
        getRegionById: builder.query({
            query: (id) => ({
                url: `/regions/${id}`,
                method: "GET"
            })
        }),
        getWeredaByRegion: builder.query({
            query: ({id, with_sites = false}) => ({
                url: `/regions/${id}/woredas?with_sites=${with_sites}`,
                method: "GET",
            })
        }),
        getSiteByRegion: builder.query({
            query: (id) => ({
                url: `/regions/${id}/sites`,
                method: "GET",
            })
        })
    }),
})

export const { useGetRegionQuery, useAddRegionMutation, useGetWeredaByRegionQuery,useGetSiteByRegionQuery, useGetRegionByIdQuery } = RegionApiSlice