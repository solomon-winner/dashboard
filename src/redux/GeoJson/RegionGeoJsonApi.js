import { apiSlice } from '../app/api/apiSlice';

export const RegionGeoJsonApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRegionGeojsons: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            })
        }),
        getRegionWoredasGeojsons: builder.query({
            query: (id) => ({
                url: `/geojson/regions/${id}/woredas`,
                method: "GET",
            })
        }),
        getRegionKebelesGeojsons: builder.query({
            query: (id) => ({
                url: `geojson/regions/${id}/kebeles`,
                method: "GET",
            })
        }),
        getRegionSitesGeojsons: builder.query({
            query: (id) => ({
                url: `/geojson/regions/${id}/sites`,
                method: "GET",
            })
        }),
    })
})

export const { useGetRegionGeojsonsQuery,
     useGetRegionWoredasGeojsonsQuery,
      useGetRegionKebelesGeojsonsQuery,
       useGetRegionSitesGeojsonsQuery } = RegionGeoJsonApi


