import { apiSlice } from '../app/api/apiSlice';

export const SiteApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSite: builder.query({
            query: (pagenumber) => ({
                url: "/sites",
                method: "GET",
                params: {
                    page: pagenumber,
                    per_page: 20,
                }
            })
        }),
        addSite: builder.mutation({
            query: (data) => ({
                url: "/sites",
                method: "POST",
                body: data     
            })
        }),
        getSiteByKebele: builder.query({
            query: (kebele) => ({
                url: `/kebeles/${kebele}/sites`,
                method: "GET",
            })
        }),
        addSiteData: builder.mutation({
            query: (data) => ({
                url: `/sites/${data.id}/details`,
                method: "POST",
                body: data     
            })
        }),
        getSiteById: builder.query({
            query: (id) => ({
                url: `/sites/${id}`,
                method: "GET"
            })
        }),
        updateSiteById: builder.mutation({
            query: ({id, data}) => ({
                url: `/sites/${id}?_method=PUT`,
                method: "POST",
                body: data,
            })
        }),
    }),
})

export const { useGetSiteQuery, useAddSiteMutation, useGetSiteByKebeleQuery, useAddSiteDataMutation, useGetSiteByIdQuery,useUpdateSiteByIdMutation } = SiteApiSlice