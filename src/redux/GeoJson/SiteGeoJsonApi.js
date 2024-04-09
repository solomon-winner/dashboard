import { apiSlice } from '../app/api/apiSlice';

export const SiteGeoJsonApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSiteGeojsons: builder.query({
            query: () => ({
                url: "geojson/sites",
                method: "GET",
            })
        })
    })
})

export const { useGetSiteGeojsonsQuery } = SiteGeoJsonApi