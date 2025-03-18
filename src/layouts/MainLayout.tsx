import React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { grey } from "@mui/material/colors";
import Footer from "../components/Footer"; // Import the Footer component

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "block",
        minHeight: "100vh",
        backgroundColor: `${grey.A100}`,
        margin: "10px",
      }}
    >
      <Box className="sidebar">
        <Sidebar />
      </Box>
      <Box className="navbar">
        <Navbar />
      </Box>
      {/* <Container>
        <Outlet />
      </Container> */}

      {/* <Footer /> */}
    </Box>
  );
};

export default MainLayout;
