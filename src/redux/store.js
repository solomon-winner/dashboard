import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './app/api/apiSlice';
import authReducer, { updateToken } from './auth/authSlice';
import userReducer from './Profile/ProfileSlice';
import roleReducer from './roles/RolesState';
import resourceReducer from './resource/ResourceState';
import institutionReducer from './institutions/InstitutionsState';
import weredaReducer from './wereda/WeredaState';
import regionReducer from './region/RegionState';
import KebeleByIdReducer from './kebele/KebeleByIdState'
import SiteByIdReducer from './site/SiteByIdState'
import GeoJsonReducer from './GeoJson/GeoJsonSlice'
import { isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { useRefreshMutation } from './auth/AuthApiSlice';
import { useDispatch } from 'react-redux';
import { rtkQueryErrorLogger } from '../components/Resource/hooks/rtkQueryErrorLogger';


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
      kebeleById: KebeleByIdReducer,
      siteById: SiteByIdReducer,
      geoJson: GeoJsonReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger), // Use the middleware
 devTools: true,
});

export const authSelector = (state) => state.auth;
export const userSelector = (state) => state.user;
export const roleSelector = (state) => state.roles;
export const resourceSelector = (state) => state.resource;
export const institutionSelector = (state) => state.institution;
export const weredaSelector = (state) => state.wereda;
export const regionSelector = (state) => state.region;
export const kebeleByIdSelector = (state) => state.kebeleById;
export const siteByIdSelector = (state) => state.siteById;
export const geoJsonSelector = (state) => state.geoJson
export default store;