// src/routes/index.tsx
import React from "react";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashBoardPage from "../pages/DashBoard/DashBoardPage";
import LoginPage from "../pages/Login/LoginPage";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layouts/MainLayout";
import { PATHS } from "../constants/pathRouter";

const routes = [
  {
    path: PATHS.HOME,
    element: (
      <ProtectedRoute>
        <MainLayout/>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoardPage />
      },
      {
        path: PATHS.DASHBOARD,
        element: <DashBoardPage />,
      },
      {
        path: PATHS.PRODUCTS,
        element: <h1>Danh sách sản phẩm</h1>,
      },
      {
        path: PATHS.CATEGORIES,
        element: <h1>Danh mục</h1>,
      },
      {
        path: PATHS.ORDERS,
        element: <h1>Đơn hàng</h1>,
      },
      {
        path: PATHS.CUSTOMERS,
        element: <h1>Khách hàng</h1>,
      },
      {
        path: PATHS.PROMOTIONS,
        element: <h1>Khuyến mãi</h1>,
      },
      {
        path: PATHS.REVIEWS,
        element: <h1>Đánh giá</h1>,
      },
      {
        path: PATHS.REPORTS,
        element: <h1>Báo cáo</h1>,
      },
      {
        path: PATHS.SETTINGS,
        element: <h1>Cài đặt</h1>,
      }
    ]
  },
  {
    path: PATHS.LOGIN,
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  }
];

export default function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}
