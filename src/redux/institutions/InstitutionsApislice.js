import { apiSlice } from '../app/api/apiSlice';

export const InstitutionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInstitutionByType: builder.query({
            query: (type) => ({
                url: `/institutions/type/${type}`,
                method: "GET",
            })
        }),
        addInstitution: builder.mutation({
            query: (data) => ({
                url: "/institutions",
                method: "POST",
                body: data     
            })
        }),
    }),
})

export const { useGetInstitutionByTypeQuery, useAddInstitutionMutation } = InstitutionApiSlice