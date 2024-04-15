import { createSlice } from "@reduxjs/toolkit";

export const GeoJsonSlice = createSlice({
    name: 'geoJson',
    initialState: {
        GeoJson: {
            AllSite:[],
            Regions:[],
            SelectedRegion:{},
            RegionsWoreda: [],
            SelectedWoreda: {},
            WoredasKebele: [],
            SelectedKebele: {},
            KebelesSite: {},
            SelectedSite: {},
            Zoom_out: false,
        },
    },

    reducers: {
        SetAllSiteData: (state,action) => {
            state.GeoJson.AllSite = action.payload;
        },
        SetAllRegions: (state, action) => {
            state.GeoJson.Regions = action.payload;
        },
        SetSelectedRegion: (state, action) => {
            state.GeoJson.SelectedRegion = action.payload;
        },
        SetSelectedWoreda: (state, action) => {
            state.GeoJson.SelectedWoreda = action.payload;
        },
        SetSelectedKebele: (state, action) => {
            state.GeoJson.SelectedKebele = action.payload;
        },
        SetSelectedSite: (state, action) => {
            state.GeoJson.SelectedSite = action.payload;
        },
        SetZoom_out: (state, action) => {
            state.Zoom_out = action.payload
        }

    }
})

export const {SetAllSiteData, SetZoom_out} = GeoJsonSlice.actions;

export default GeoJsonSlice.reducer;