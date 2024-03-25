import { apiSlice } from '../app/api/apiSlice';

export const KebeleGeoJsonApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getKebeleGeojsons: builder.query({
            query: () => ({
                url: "/geojson/kebeles",
                method: "GET",
            })
        }),
        getKebeleSiteGeojsons: builder.query({
            query: (id) => ({
                url: `/geojson/kebeles/${id}/sites`,
                method: "GET",
            })
        })
    })
})

export const { useGetKebeleGeojsons, useGetKebeleSiteGeojsons } = KebeleGeoJsonApi