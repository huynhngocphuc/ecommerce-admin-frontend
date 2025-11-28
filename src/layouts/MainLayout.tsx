import React from "react";
import { Container, Box, useTheme, useMediaQuery, Drawer, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const drawerWidth = 300;
const miniDrawerWidth = 70;
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
      <Drawer
        sx={{
          height: `calc(100vh - ${theme.spacing(4)})`,
          width: drawerOpen
            ? {
                xs: miniDrawerWidth,
                md: drawerWidth,
              }
            : miniDrawerWidth,
          "& .MuiDrawer-paper": {
            top: theme.spacing(2),
            left: theme.spacing(2),
            height: `calc(100vh - ${theme.spacing(4)})`,
            width: drawerOpen
              ? {
                  xs: miniDrawerWidth,
                  md: drawerWidth,
                }
              : miniDrawerWidth,
            borderRadius: 1,
          },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
        variant="persistent"
        open
      >
        <Sidebar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />
      </Drawer>

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
    </Box>
  );
};

export default MainLayout;
