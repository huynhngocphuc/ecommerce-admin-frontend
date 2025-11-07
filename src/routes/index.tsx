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
import PublicRoute from "./PublicRoute";
import MainLayout from "../layouts/MainLayout";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoardPage />, // Thay bằng <HomePage /> sau này
      },
      {
        path: "dashboard",
        element: <DashBoardPage />,
      }
    ]
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/products",
    element: <h1>Danh sách sản phẩm</h1>, // Thay bằng <ProductPage /> sau này
  }
  
];

export default function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}
