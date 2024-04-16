import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: "account",
    initialState: {
        accounts: [],
        isLoadingAccounts: true,
    },
    reducers: {
        setAccounts: (state, action) => {
            state.accounts = action.payload;
            state.isLoadingAccounts = false;
        },
        createAccount: (state, action) => {
            state.accounts.push(action.payload);
        },
        deleteAccounts: (state, action) => {
            state.accounts = state.accounts.filter((account) => account.id !== action.payload);
        },
        setLoadingAccounts: (state, action) => {
            state.isLoadingAccounts = action.payload;
        },  
    }
});

export const { setAccounts, createAccount, deleteAccounts, setLoadingAccounts } = accountSlice.actions;
export default accountSlice.reducer;