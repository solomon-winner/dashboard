import { apiSlice } from '../app/api/apiSlice';
// login request
const AuthApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credetials) => ({
        url: '/login',
        method: 'POST',
        body: { ...credetials },
      }),
    }),
    refresh: builder.mutation({
      query: (refeshtoken) => ({
        url: '/refresh-token',
        method: 'POST',
        body: refeshtoken,
      })
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/forgot-password',
        method: 'POST',
        body: email
      })
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/reset-password',
        method: 'POST',
        body: data
      })
    }),
    
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = AuthApiSlice;

export default AuthApiSlice;