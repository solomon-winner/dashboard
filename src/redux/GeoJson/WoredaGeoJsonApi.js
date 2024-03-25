import { apiSlice } from '../app/api/apiSlice';

export const WoredaGeoJsonApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWoredaGeojsons: builder.query({
            query: () => ({
                url: "/geojson/woredas",
                method: "GET",
            })
        }),
        getWoredaKebeleGeojsons: builder.query({
            query: (id) => ({
                url: `/geojson/woredas/${id}/kebeles`,
                method: "GET",
            })
        }),
        getWoredaSiteGeojsons: builder.mutation({
            query: (id) => ({
                url: `/geojson/woredas/${id}/sites`,
                method: "GET",
            })
        })
    })
})

export const { useGetWoredaGeojsons, useGetWoredaKebeleGeojsons, useGetWoredaSiteGeojsons } = WoredaGeoJsonApi