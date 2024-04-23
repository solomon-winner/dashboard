import { createSlice } from "@reduxjs/toolkit";

export const weredaSlice = createSlice({
    name: "wereda",
    initialState: {
        weredas: [],
        isLoadingWeredas: true,
    },
    reducers: {
        setWeredas: (state, action) => {
            state.weredas = action.payload;
            state.isLoadingWeredas = false;
        },

        addWereda: (state, action) => {
            state.weredas.push(action.payload);
        },

        setLoadingWeredas: (state, action) => {
            state.isLoadingWeredas = action.payload;
        },
        deleteWereda: (state, action) => {
            state.weredas = state.weredas.filter(wereda => wereda.id !== action.payload);
        }
    },
})

export const { setWeredas, addWereda, setLoadingWeredas, deleteWereda } = weredaSlice.actions;
export default weredaSlice.reducer