import { apiSlice } from '../app/api/apiSlice';

export const RolesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: () => '/roles',
            method: 'GET'

        }),
        addRole: builder.mutation({
            query: (data) => ({
                url: '/roles',
                method: 'POST',
                body: data
            })
        }),
        getPermissions: builder.query({
            query: () => ({
                url: '/permissions',
                method: 'GET',
            })
        }),
        editRole: builder.mutation({
            query: (data) => ({
                url: `/roles/${data.id}?_method=PUT`,
                method: 'POST',
                body: data
            })
        }),
        getRoleById: builder.query({
            query: (id) => ({
                url: `/roles/${id}`,
                method: 'GET',
            })
        }),
        deleteRole: builder.mutation({
            query: (id) => ({
                url: `/roles/${id}`,
                method: 'DELETE',
            })
        }),
    }),
})

export const { useGetRolesQuery, useAddRoleMutation,useGetPermissionsQuery,useEditRoleMutation,useGetRoleByIdQuery, useDeleteRoleMutation } = RolesApiSlice