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
  }),
});

export const {
  useLoginMutation,
} = AuthApiSlice;

export default AuthApiSlice;