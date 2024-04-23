import { createSlice } from "@reduxjs/toolkit";

export const regionSlice = createSlice({
    name: "region",
    initialState: {
        regions: [],
        isLoadingRegions: true,
    },
    reducers: {
        setRegions: (state, action) => {
            state.regions = action.payload;
            state.isLoadingRegions = false;
        },

        addRegion: (state, action) => {
            state.regions.push(action.payload);
        },

        setLoadingRegions: (state, action) => {
            state.isLoadingRegions = action.payload;
        },

        deleteRegion: (state, action) => {
            state.regions = state.regions.filter(region => region.id !== action.payload);
        }
    },
});

export const { setRegions, addRegion, setLoadingRegions, deleteRegion } =
    regionSlice.actions;
export default regionSlice.reducer