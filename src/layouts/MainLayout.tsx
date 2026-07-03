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
        position: "relative",
        backgroundColor: "background.default",
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        padding: { xs: 1.5, md: 2.5 },
        boxSizing: "border-box",
        gap: { xs: 1.5, md: 2.5 },
        overflow: "hidden",
      }}
    >
      <Drawer
        sx={{
          height: "100%",
          width: isMobile ? undefined : drawerPaperWidth,
          "& .MuiDrawer-paper": {
            top: { xs: 0, md: theme.spacing(2.5) },
            left: { xs: 0, md: theme.spacing(2.5) },
            height: { xs: "100%", md: `calc(100dvh - ${theme.spacing(5)})` },
            width: drawerPaperWidth,
            borderRadius: { xs: 0, md: 4 },
            overflow: "hidden",
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
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1.5, md: 2.5 },
        }}
      >
        <Container maxWidth="xl" sx={{ width: "100%", minWidth: 0, display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2.5 }, px: { xs: 0, md: 0 } }}>
          <Navbar onMenuClick={handleDrawerToggle} />
          <Box component="main" sx={{ flexGrow: 1, minWidth: 0, pb: { xs: 2, md: 4 } }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
