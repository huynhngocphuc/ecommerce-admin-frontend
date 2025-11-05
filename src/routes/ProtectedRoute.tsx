import React, { useEffect } from "react";
import { Role } from "../features/auth/type";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { Navigate } from "react-router-dom";
import { verifyAuth } from "../redux/slices/auth.slice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, userRoles, isInitialized } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  console.log("🚀 ~ ProtectedRoute ~ isAuthenticated:", isAuthenticated);
  useEffect(() => {
    if (!isInitialized) {
      console.log("🚀 ~ ProtectedRoute ~ isInitialized:", isInitialized)
      dispatch(verifyAuth());
    }
  }, [dispatch, isInitialized]);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
