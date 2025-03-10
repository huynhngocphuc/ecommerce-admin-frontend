import React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1}>
        <Navbar />
        <Container>
          <Outlet/>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;