import { apiSlice } from '../app/api/apiSlice';

export const weredaApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWoreda: builder.query({
            query: (params) => ({
                url: "/woredas",
                method: "GET",
                params:params
            })
        }),
        addWoreda: builder.mutation({
            query: (data) => ({
                url: "/woredas",
                method: "POST",
                body: data     
            })
        }),
        addWoredaData: builder.mutation({
            query: (data) => ({
                url: `/woredas/${data.id}/details`,
                method: "POST",
                body: data     
            })
        }),
        getWeredaById: builder.query({
            query: (id) => ({
                url: `/woredas/${id}`,
                method: "GET",
            })
        }),
        updateWeredaById: builder.mutation({
            query: ({ id, data }) => ({
                url: `/woredas/${id}?_method=PUT`,
                method: "POST",
                body: data,
            })
        }),
        deleteWeredaById: builder.mutation({
            query: (id) => ({
                url: `/woredas/${id}`,
                method: "DELETE",
            })
        }),
        
    }),
})

export const { useGetWoredaQuery, useAddWoredaMutation,
     useAddWoredaDataMutation, useGetWeredaByIdQuery, 
     useUpdateWeredaByIdMutation, useDeleteWeredaByIdMutation } = weredaApiSlice