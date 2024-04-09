import { createSlice } from "@reduxjs/toolkit";

export const GeoJsonSlice = createSlice({
    name: 'geoJson',
    initialState: {
        GeoJson: {
            AllSite:[78],
            Regions:[]
        },
    },

    reducers: {
        SetAllSiteData: (state,action) => {
            state.GeoJson.AllSite = action.payload;
        },

    }
})

export const {SetAllSiteData} = GeoJsonSlice.actions;

export default GeoJsonSlice.reducer;