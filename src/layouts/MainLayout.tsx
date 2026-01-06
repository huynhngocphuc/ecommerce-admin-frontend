import React, { useEffect } from "react";
import { Box, useTheme, useMediaQuery, Drawer, Container } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const drawerWidth = 280;
const miniDrawerWidth = 80;

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  useEffect(() => {
    if (isMobile) {
      setDrawerOpen(false);
    }
  }, [location.pathname, isMobile]);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const drawerPaperWidth = isMobile ? drawerWidth : drawerOpen ? drawerWidth : miniDrawerWidth;

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
          width: isMobile ? undefined : drawerPaperWidth,
          "& .MuiDrawer-paper": {
            top: theme.spacing(2),
            left: theme.spacing(2),
            height: `calc(100vh - ${theme.spacing(4)})`,
            width: drawerPaperWidth,
            borderRadius: 2,
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={isMobile ? { keepMounted: true } : undefined}
      >
        <Sidebar drawerOpen={!isMobile && drawerOpen} handleDrawerToggle={handleDrawerToggle} />
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2),
        }}
      >
        <Container maxWidth="lg">
          <Navbar onMenuClick={handleDrawerToggle} />
          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
