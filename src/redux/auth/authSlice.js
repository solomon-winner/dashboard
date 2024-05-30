import { createSlice } from '@reduxjs/toolkit';
import { log } from '../../components/Resource/Utility/Logger';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user') || null,
    token: localStorage.getItem('accessToken') || null,
    refresh_token: localStorage.getItem('refreshToken') || null,
    all_permissions: localStorage.getItem('all_permissions') || [],
    isRefreshingToken: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, email, data } = action.payload;
      state.user = email || user;
      state.token = data.token;
      state.refresh_token = data.refresh_token;
      state.all_permissions = data.all_permissions;
      // store in localStorage when logging in
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('user', email || user);
      localStorage.setItem('refreshToken', data.refresh_token);
      localStorage.setItem('reloadTriggered', 'false');
      localStorage.setItem('all_permissions', data.all_permissions);
    },
    setIsRefreshingToken: (state, action) => {
      state.isRefreshingToken = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refresh_token = null
      state.all_permissions = []
      // Clear localStorage when logging out
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('all_permissions');
    },
    updateToken: (state, action) => {
      const {data } = action.payload;
      console.log(data.token);
      state.token = data.token;
      // Update localStorage with the new token
      localStorage.setItem('accessToken', data.token);
   },
  },
});

export const { setCredentials, logOut,updateToken,setIsRefreshingToken } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refresh_token