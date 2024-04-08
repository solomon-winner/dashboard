import { createSlice } from "@reduxjs/toolkit";

export const GeoJsonSlice = createSlice({
    name: 'geoJson',
    initialState: {
        GeoJson: {
            AllSite:[],

        },
    },

    reducers: {
        SetAllSiteData: (state,action) => {
            state.GeoJson = {...state.UserData,...action.payload};
        },

    }
})

export const {SetAllSiteData} = GeoJsonSlice.actions;

export default GeoJsonSlice.reducer;