import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { Navigate } from "react-router-dom";
import { verifyAuth } from "../redux/slices/auth.slice";
import { Box, CircularProgress } from "@mui/material";

interface PublicRouteProps {
  children: React.ReactNode;
}
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isInitialized) {
      dispatch(verifyAuth());
    }
  }, [dispatch, isInitialized]);

  if (!isInitialized) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
