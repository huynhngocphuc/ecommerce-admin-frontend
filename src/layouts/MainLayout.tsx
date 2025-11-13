import React from "react";
import { Container, Box, useTheme, useMediaQuery, Drawer, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        padding: theme.spacing(2),
        boxSizing: "border-box",
        gap: theme.spacing(2),
      }}
    >
      {drawerOpen && (
        <Drawer
          sx={{
            backgroundColor: "secondary.main",
            height: `calc(100vh - ${theme.spacing(4)})`,
            width: {
              xs: 0,
              md: "300px",
            },
            "& .MuiDrawer-paper": {
              top: theme.spacing(2), // Khoảng cách từ top
              left: theme.spacing(2), // Khoảng cách từ left
              height: `calc(100vh - ${theme.spacing(4)})`, // Chiều cao cố định
              width: {
                xs: 0,
                md: "300px",
              },
              borderRadius: 1, // Tùy chọn: bo góc
            },
          }}
          variant="persistent"
          open={drawerOpen}
        >
          <Sidebar />
        </Drawer>
      )}
      <Box
        sx={{
          backgroundColor: "primary.main",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "110vh",
          gap: theme.spacing(2),
        }}
      >
        <Box sx={{ backgroundColor: "success.main", height: "100px" }}>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            color="secondary"
            onClick={handleDrawerToggle}
          >
            Click Me
          </Button>
        </Box>
        <Box sx={{ backgroundColor: "warning.main", flexGrow: 1 }}></Box>
      </Box>
      {/* <Sidebar /> */}
      {/* <Outlet /> */}
    </Box>
  );
};

export default MainLayout;
