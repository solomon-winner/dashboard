import { apiSlice } from '../app/api/apiSlice';
export const RegionGeoJsonApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRegionGeojsons: builder.query({
            query: () => ({
                url: "/geojson/regions",
                method: "GET",
            })
        }),
        getRegionWoredasGeojsons: builder.query({
            query: (id) => ({
                url: `/api/geojson/regions/${id}/woredas`,
                method: "GET",
            })
        }),
        getRegionKebelesGeojsons: builder.mutation({
            query: (id) => ({
                url: `geojson/regions/${id}/kebeles`,
                method: "GET",
            })
        }),
        getRegionSitesGeojsons: builder.mutation({
            query: (id) => ({
                url: `/api/geojson/regions/${id}/sites`,
                method: "GET",
            })
        }),
    })
})

export const { useGetRegionGeojsons, useGetRegionWoredasGeojsons, useGetRegionKebelesGeojsons, useGetRegionSitesGeojsons } = RegionGeoJsonApi