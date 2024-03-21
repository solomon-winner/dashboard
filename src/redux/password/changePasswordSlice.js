import { createSlice } from "@reduxjs/toolkit";

export const passwordSlice = createSlice({
    name: 'password',
    initialState: {
       PasswordData: {current_password: '',
       new_password: '',
       new_password_confirmation: ''}
    },

    reducers: {
        SetPasswordData: (state,action) => {
            state.PasswordData = action.payload;
            console.log(action.payload);
        }
    }
})

export const {SetPasswordData} = passwordSlice.actions;

export default passwordSlice.reducer;