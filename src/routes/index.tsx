// src/routes/index.tsx
import React from "react";
import { useRoutes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashBoardPage from "../pages/DashBoard/DashBoardPage";
// Import các page component
// import HomePage from "../pages/HomePage";
// import ProductPage from "../pages/ProductPage";
// import LoginPage from "../pages/LoginPage";
import LoginPage from "../pages/Login/LoginPage";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <h1>Trang chủ</h1>
      </ProtectedRoute>
    ), // Thay bằng <HomePage /> sau này
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/products",
    element: <h1>Danh sách sản phẩm</h1>, // Thay bằng <ProductPage /> sau này
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashBoardPage />
      </ProtectedRoute>
    ),
  },
];

export default function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}
