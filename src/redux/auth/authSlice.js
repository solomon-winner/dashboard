import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user') || null,
    token: localStorage.getItem('accessToken') || null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, email, data } = action.payload;
      state.user = email || user;
      state.token = data.token;
      // store in localStorage when logging in
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user', email || user);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      // Clear localStorage when logging out
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;