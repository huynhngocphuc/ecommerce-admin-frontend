import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, useMediaQuery } from '@mui/material';

interface NavbarProps {
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-commerce Admin
        </Typography>
        <IconButton edge="end" color="inherit" onClick={toggleDarkMode}>
          {/* {isMobile ? <Brightness4 /> : <Brightness7 />} */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
