import { createSlice } from "@reduxjs/toolkit";
import { log } from "../../components/Resource/Utility/Logger";

export const GeoJsonSlice = createSlice({
    name: 'geoJson',
    initialState: {
        GeoJson: {
            AllSite:[],
            AllRegions:[],
            SelectedRegion:null,
            RegionsWoreda: [],
            SelectedWoreda: null,
            WoredasKebele: [],
            SelectedKebele: null,
            KebelesSite: [],
            SelectedSite: null,
            Zoom_out: false,
        },
    },

    reducers: {
        SetAllSiteData: (state,action) => {
            state.GeoJson.AllSite = [...state.GeoJson.AllSite, action.payload];
        },
        SetAllRegions: (state, action) => {
            state.GeoJson.AllRegions = [...state.GeoJson.AllRegions, action.payload];

        },
        SetSelectedRegion: (state, action) => {
            state.GeoJson.SelectedRegion = action.payload;
            state.GeoJson.SelectedSite = null;
            state.GeoJson.SelectedWoreda = null;
            state.GeoJson.SelectedKebele = null;
        },
        SetSelectedWoreda: (state, action) => {
            state.GeoJson.SelectedWoreda = action.payload;
            state.GeoJson.SelectedSite = null;
            state.GeoJson.SelectedRegion = null;
            state.GeoJson.SelectedKebele = null;
        },
        SetSelectedKebele: (state, action) => {
            state.GeoJson.SelectedKebele = action.payload;
            state.GeoJson.SelectedRegion = null;
            state.GeoJson.SelectedWoreda = null;
            state.GeoJson.SelectedSite = null;
        },
        SetSelectedSite: (state, action) => {
            state.GeoJson.SelectedSite = action.payload;
            state.GeoJson.SelectedRegion = null;
            state.GeoJson.SelectedWoreda = null;
            state.GeoJson.SelectedKebele = null;

        },
        SetLocationInfo: (state, action) => {
            state.GeoJson.LocationInfo = action.payload
  
        }


    }
})

export const {SetAllSiteData,
     SetAllRegions, 
     SetSelectedRegion, 
     SetSelectedWoreda, 
     SetSelectedKebele, 
     SetSelectedSite, 
     SetLocationInfo} = GeoJsonSlice.actions;

export default GeoJsonSlice.reducer;