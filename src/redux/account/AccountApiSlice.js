import { apiSlice } from '../app/api/apiSlice';

export const accountApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
                param: {
                    page: 1,    
                    per_page: 20
                }
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: "/user",
                method: "GET",
            })
        }),
        addAccount: builder.mutation({
            query: (data) => ({
                url: "/users",
                method: "POST",
                body: data
            })
        }),
        getRoleById: builder.query({
            query: (id) => ({
                url: `/roles/${id}`,
                method: "GET",
            })
        }),
    })
})

export const { 
    useGetAccountsQuery, 
    useGetUserQuery, 
    useAddAccountMutation,
    useGetRoleByIdQuery, // Add the useGetRoleByIdQuery hook
} = accountApiSlice;
