import { apiSlice } from '../app/api/apiSlice';

export const SiteApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSite: builder.query({
            query: (params) => ({
                url: "/sites",
                method: "GET",
                params:params
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
        getSitebyKebele: builder.query({
            query: (kebele) => ({
                url: `/kebeles/${kebele}/sites`,
                method: "GET",
            })
        }),
        deleteSite: builder.mutation({
            query: (id) => ({
                url: `/sites/${id}`,
                method: "DELETE",
            })
        }),
    }),
})

export const { useGetSiteQuery, useAddSiteMutation, useGetSiteByKebeleQuery, useAddSiteDataMutation, useGetSiteByIdQuery,useUpdateSiteByIdMutation, useGetSitebyKebeleQuery, useDeleteSiteMutation } = SiteApiSlice