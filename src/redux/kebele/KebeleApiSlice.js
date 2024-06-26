import { apiSlice } from "../app/api/apiSlice";

export const KebeleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKebele: builder.query({
      query: (params) => ({
        url: "/kebeles",
        method: "GET",
        params:params
      }),
    }),
    addKebele: builder.mutation({
      query: (data) => ({
        url: "/kebeles",
        method: "POST",
        body: data,
      }),
    }),
    getKebeleByWereda: builder.query({
      query: ({id, with_sites = true}) => ({
        url: `woredas/${id}/kebeles?all=${with_sites}`,
        method: "GET",
      }),
    }),
    addKebeleData: builder.mutation({
      query: (data) => ({
        url: `/kebeles/${data.id}/details`,
        method: "POST",
        body: data,
      }),
    }),
    getKebeleById: builder.query({
      query: (id) => ({
        url: `kebeles/${id}`,
        method: "GET",
      }),
    }),
    updateKebeleById: builder.mutation({
      query: ({ id, data }) => ({
        url: `kebeles/${id}?_method=PUT`,
        method: "POST",
        body: data,
      }),
    }),
    deleteKebele: builder.mutation({
      query: (id) => ({
        url: `kebeles/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetKebeleQuery,
  useAddKebeleMutation,
  useGetKebeleByWeredaQuery,
  useAddKebeleDataMutation,
  useGetKebeleByIdQuery,
  useUpdateKebeleByIdMutation,
  useDeleteKebeleMutation,
} = KebeleApiSlice;
