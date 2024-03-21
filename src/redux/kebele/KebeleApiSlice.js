import { apiSlice } from '../app/api/apiSlice';

export const KebeleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getKebele: builder.query({
            query: (pagenumber) => ({
                url: "/kebeles",
                method: "GET",
                params: {
                    page: pagenumber,
                    per_page: 20,
                }
            })
        }),
        addKebele: builder.mutation({
            query: (data) => ({
                url: "/kebeles",
                method: "POST",
                body: data     
            })
        }),
        getKebeleByWereda: builder.query({
            query: (id) => ({
                url: `woredas/${id}/kebeles`,
                method: "GET",
            })
        }),
        addKebeleData: builder.mutation({
            query: (data) => ({
                url: `/kebeles/${data.id}/details`,
                method: "POST",
                body: data     
            })
        }),
    }),
})

export const { useGetKebeleQuery, useAddKebeleMutation, useGetKebeleByWeredaQuery, useAddKebeleDataMutation } = KebeleApiSlice