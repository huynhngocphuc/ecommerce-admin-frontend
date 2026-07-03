// src/routes/index.tsx
import React from "react";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashBoardPage from "../pages/DashBoard/DashBoardPage";
import LoginPage from "../pages/Login/LoginPage";
import PublicRoute from "./PublicRoute";
import MainLayout from "../layouts/MainLayout";
import { PATHS } from "../constants/pathRouter";
import AdminRoute from "./AdminRoute";
import ProductsPage from "../pages/Products/ProductsPage";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ComingSoonPage({ title, description, actionLabel, actionPath }: { title: string; description: string; actionLabel: string; actionPath: string; }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: { xs: 2, md: 3 } }}>
      <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
        <Stack spacing={2} sx={{ maxWidth: 640 }}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.18em' }}>
            workspace section
          </Typography>
          <Typography variant="h3" component="h1">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button variant="contained" onClick={() => navigate(actionPath)}>
              {actionLabel}
            </Button>
            <Button variant="outlined" onClick={() => navigate(PATHS.HOME)}>
              Back to dashboard
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

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
        element: (
          <AdminRoute>
            <ProductsPage />
          </AdminRoute>
        ),
      },
      {
        path: PATHS.CATEGORIES,
        element: <ComingSoonPage title="Categories" description="Use this section to group products and tune how they appear in the catalog." actionLabel="Open products" actionPath={PATHS.PRODUCTS} />,
      },
      {
        path: PATHS.ORDERS,
        element: <ComingSoonPage title="Orders" description="Track incoming orders, exceptions, and fulfillment handoffs here." actionLabel="Open products" actionPath={PATHS.PRODUCTS} />,
      },
      {
        path: PATHS.CUSTOMERS,
        element: <ComingSoonPage title="Customers" description="This view can surface repeat buyers, support notes, and account activity." actionLabel="Open products" actionPath={PATHS.PRODUCTS} />,
      },
      {
        path: PATHS.PROMOTIONS,
        element: <ComingSoonPage title="Promotions" description="Plan discounts, bundles, and campaign timing from a cleaner staging area." actionLabel="Open products" actionPath={PATHS.PRODUCTS} />,
      },
      {
        path: PATHS.REVIEWS,
        element: <ComingSoonPage title="Reviews" description="Collect product feedback and route the most important notes to the team." actionLabel="Open products" actionPath={PATHS.PRODUCTS} />,
      },
      {
        path: PATHS.REPORTS,
        element: <ComingSoonPage title="Reports" description="Turn inventory and order data into a view that people can actually scan quickly." actionLabel="Open products" actionPath={PATHS.PRODUCTS} />,
      },
      {
        path: PATHS.SETTINGS,
        element: <ComingSoonPage title="Settings" description="Keep the operational controls and preferences grouped in one place." actionLabel="Open products" actionPath={PATHS.PRODUCTS} />,
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
