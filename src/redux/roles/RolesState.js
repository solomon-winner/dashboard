import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
    name: "roles",
    initialState: {
        roles: [],
        isLoadingRoles: true,
    },
    reducers: {
        setRoles: (state, action) => {
            state.roles = action.payload;
            state.isLoadingRoles = false;
        },
        createRoles: (state, action) => {
            state.roles.push(action.payload);
        },
        deleteRoles: (state, action) => {
            state.roles = state.roles.filter((role) => role.id !== action.payload);
        },
        setLoadingRoles: (state, action) => {
            state.isLoadingRoles = action.payload;
        },
    }
});

export const { setRoles, createRoles, deleteRoles, setLoadingRoles } = roleSlice.actions;
export default roleSlice.reducer;