import React from "react";
import { Role } from "../features/auth/type";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{children: React.ReactNode, role?: Role[]}> = ({children}) => {
     const { isAuthenticated, userRoles } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" replace />;
  }
  
    return <>{children}</>;
};

export default ProtectedRoute;
