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
        ProfileDropDown: false,
    },

    reducers: {
        SetProfileData: (state,action) => {
            state.UserData = {...state.UserData,...action.payload};
        },
        setProfileDropDown: (state, action) => {
            state.ProfileDropDown = action.payload;
        }

    }
})

export const {SetProfileData, setAvaterUrl, setProfileDropDown} = ProfileSlice.actions;

export default ProfileSlice.reducer;