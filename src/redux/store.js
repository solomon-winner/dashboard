import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app/api/apiSlice';
import authReducer from './auth/authSlice';
import userReducer from './Profile/ProfileSlice';
import roleReducer from './roles/RolesState';
import resourceReducer from './resource/ResourceState';
import institutionReducer from './institutions/InstitutionsState';
import weredaReducer from './wereda/WeredaState';
import regionReducer from './region/RegionState';

const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      user: userReducer,
      roles: roleReducer,
      resource: resourceReducer,
      institution: institutionReducer,
      wereda: weredaReducer,
      region: regionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export const authSelector = (state) => state.auth;
export const userSelector = (state) => state.user;
export const roleSelector = (state) => state.roles;
export const resourceSelector = (state) => state.resource;
export const institutionSelector = (state) => state.institution;
export const weredaSelector = (state) => state.wereda;
export const regionSelector = (state) => state.region;

export default store;