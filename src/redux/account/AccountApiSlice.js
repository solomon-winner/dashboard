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
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            })
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            })
        }),
        UpdateUser: builder.mutation({
            query: (data) => ({
                url: `/users/${data.id}?_method=PUT`,
                method: "PUT",
                body: data
            })
        }),
    })
})

export const { useGetAccountsQuery, useGetUserQuery, useAddAccountMutation,
     useDeleteAccountMutation, useGetUserByIdQuery, useUpdateUserMutation } = accountApiSlice