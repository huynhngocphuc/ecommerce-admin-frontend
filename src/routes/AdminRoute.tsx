import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { verifyAuth } from '../redux/slices/auth.slice';
import { PERMISSIONS } from '../constants/permissions';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized, userRoles, userPermissions } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(verifyAuth());
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin =
    userRoles.includes('admin') ||
    userRoles.includes('superadmin') ||
    userPermissions.includes(PERMISSIONS.PRODUCT_READ_ADMIN);

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;