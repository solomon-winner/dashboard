import { apiSlice } from '../app/api/apiSlice';

export const weredaApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWoreda: builder.query({
            query: (pagenumber) => ({
                url: "/woredas",
                method: "GET",
                params: {
                    page: pagenumber,
                    per_page: 20,
                }
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
    }),
})

export const { useGetWoredaQuery, useAddWoredaMutation, useAddWoredaDataMutation, useGetWeredaByIdQuery } = weredaApiSlice