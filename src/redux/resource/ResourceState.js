import { createSlice } from "@reduxjs/toolkit";

export const resourceSlice = createSlice({
    name: "resource",
    initialState: {
        landuse: [],
        road: [],
        tree:[],
        forage: [],
        livelihood: [],
        livestock: [],
        crop:[],
        fruit: [],
        nursery: [],
        causeofdeforestation: [],
        energy_source: [],
        isLoadingLanduse: true,
        isLoadingRoad: true,
        isLoadingTree: true,
        isLoadingForage: true,
        isLoadingLivelihood: true,
        isLoadingLiveStock: true,
        isLoadingCrop: true,
        isLoadingFruit: true,
        isLoadingNursery: true,
        isLoadingCauseofdeforestation: true,
        isLoadingEnergy_source: true,
    },
    reducers: {
        setLandUse: (state, action) => {
            state.landuse = action.payload;
            state.isLoadingLanduse = false;
        },
        createLandUse: (state, action) => {
            state.landuse.push(action.payload);
        },
        setRoad: (state, action) => {
            state.road = action.payload;
            state.isLoadingRoad = false;
        },
        createRode: (state, action) => {
            state.road.push(action.payload);
        },
        setTree: (state, action) => {
            state.tree = action.payload;
            state.isLoadingTree = false;
        },
        createTree: (state, action) => {
            state.tree.push(action.payload);
        },
        setForage: (state, action) => {
            state.forage = action.payload;
            state.isLoadingForage = false;
        },
        createForage: (state, action) => {
            state.forage.push(action.payload);
        },
        setLivelihood: (state, action) => {
            state.livelihood = action.payload;
            state.isLoadingLivelihood = false;
        },
        createLivelihood: (state, action) => {
            state.livelihood.push(action.payload);
        },
        setLiveStock: (state, action) => {
            state.livestock = action.payload;
            state.isLoadingLiveStock = false;
        },
        createLiveStock: (state, action) => {
            state.livestock.push(action.payload);
        },
        setCrop: (state, action) => {
            state.crop = action.payload;
            state.isLoadingCrop = false;
        }
        ,
        setFruit: (state, action) => {
            state.fruit = action.payload;
            state.isLoadingFruit = false;
        },
        setNursery: (state, action) => {
            state.nursery = action.payload;
            state.isLoadingNursery = false;
        },
        setCauseofdeforestation: (state, action) => {
            state.causeofdeforestation = action.payload;
            state.isLoadingCauseofdeforestation = false;
        },
        setEnergy_source: (state, action) => {
            state.energy_source = action.payload;
            state.isLoadingEnergy_source = false;
        },
        deleteResources: (state, action) => {
            state.landuse = state.landuse.filter(
                (resource) => resource.id !== action.payload
            );
        },
        setLoadingResources: (state, action) => {
            state.isLoadingResources = action.payload;
        },
    },
});

export const {
    setLandUse,
    createLandUse,
    deleteResources,
    setLoadingResources,
    setRoad,
    createRode,
    setTree,
    createTree,
    setForage,
    createForage,
    setLivelihood,
    createLivelihood,
    setLiveStock,
    createLiveStock,
    setCrop,
    setFruit,
    setNursery,
    setCauseofdeforestation,
    setEnergy_source
} = resourceSlice.actions;
export default resourceSlice.reducer;