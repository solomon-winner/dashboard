import { apiSlice } from '../app/api/apiSlice';

export const GeoJsonApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWoredaGeojsons: builder.query({
            query: () => ({
                url: "/geojson/woredas",
                method: "GET",
            })
        }),
        getKebeleGeojsons: builder.query({
            query: (id) => ({
                url: `/geojson/woredas/${id}/kebeles`,
                method: "GET",
            })
        }),
        getSiteGeojsons: builder.mutation({
            query: (id) => ({
                url: `/geojson/woredas/${id}/sites`,
                method: "GET",
            })
        })
    })
})

export const { useGetWoredaGeojsons, useGetKebeleGeojsons, useGetSiteGeojsons } = GeoJsonApi