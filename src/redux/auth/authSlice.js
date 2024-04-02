import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user') || null,
    token: localStorage.getItem('accessToken') || null,
    refresh_token: localStorage.getItem('refreshToken') || null
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, email, data } = action.payload;
      state.user = email || user;
      state.token = data.token;
      state.refresh_token = data.refresh_token
      // store in localStorage when logging in
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user', email || user);
      localStorage.setItem('refreshToken', data.refresh_token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refresh_token = null
      // Clear localStorage when logging out
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refresh_token