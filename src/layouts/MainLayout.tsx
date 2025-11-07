import React from "react";
import { Container, Box, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMobile ? 0 : '100px', // Adjust based on sidebar width
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {/* <Navbar /> */}
          <Box sx={{ mt: 3 }}>
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;