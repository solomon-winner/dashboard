import { createSlice } from "@reduxjs/toolkit";

export const institutionSlice = createSlice({
    name: "institution",
    initialState: {
        school: [],
        healthFacility: [],
        isLoadingInstitutions: true,
    },
    reducers: {
        setSchool: (state, action) => {
            state.school = action.payload;
            state.isLoadingInstitutions = false;
        }
        ,
        setHealthFacility: (state, action) => {
            state.healthFacility = action.payload;
            state.isLoadingInstitutions = false;
        },
        addSchool: (state, action) => {
            state.school.push(action.payload);
        },
        addHealthFacility: (state, action) => {
            state.healthFacility.push(action.payload);
        },
        deleteInstitutions: (state, action) => {
            state.institutions = state.institutions.filter(
                (institution) => institution.id !== action.payload
            );
        },
        setLoadingInstitutions: (state, action) => {
            state.isLoadingInstitutions = action.payload;
        },
    },
});

export const {
    setSchool,
    setHealthFacility,
    addSchool,
    addHealthFacility,
    deleteInstitutions,
    setLoadingInstitutions,
} = institutionSlice.actions;
export default institutionSlice.reducer;