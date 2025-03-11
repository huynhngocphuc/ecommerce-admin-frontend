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
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: `${grey.A100}`,
      }}
    >
      <Navbar />
      <Sidebar />
      <Container>
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
};

export default MainLayout;
