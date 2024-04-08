import { apiSlice } from '../app/api/apiSlice';

export const SiteGeoJsonApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSiteGeojsons: builder.query({
            query: () => ({
                url: "/geojson/Sites",
                method: "GET",
            })
        })
    })
})

export const { getSiteGeojsons } = SiteGeoJsonApi