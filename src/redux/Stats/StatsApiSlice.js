import { apiSlice } from '../app/api/apiSlice';

export const StatsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStats: builder.query({
            query: () => ({
                url: "/stats",
                method: "GET",
            })
        }),
    }),
})

export const { useGetStatsQuery } = StatsApiSlice