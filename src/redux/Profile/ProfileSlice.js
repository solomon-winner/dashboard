import { createSlice } from "@reduxjs/toolkit";

export const ProfileSlice = createSlice({
    name: 'user',
    initialState: {
        UserData: {
            name: '',
            email:'',
            birthday: '',
            mobile: '',
            organization: '',
            position: '',
            created_at: "",
            updated_at: "",
            avatar:null
        },
    },

    reducers: {
        SetProfileData: (state,action) => {
            state.UserData = {...state.UserData,...action.payload};
        },

    }
})

export const {SetProfileData, setAvaterUrl} = ProfileSlice.actions;

export default ProfileSlice.reducer;