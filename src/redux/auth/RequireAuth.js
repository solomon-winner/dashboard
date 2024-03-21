import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken } from './authSlice';

// check if token is stored
const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  return (
    token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;