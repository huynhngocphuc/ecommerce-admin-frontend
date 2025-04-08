import React from "react";
import { AppBar, Toolbar, IconButton, Typography, useMediaQuery } from "@mui/material";

interface NavbarProps {
  // toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "background.default",
        borderRadius: "10px",
        position:"sticky",
        top: 0,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-commerce
        </Typography>
        <IconButton edge="end" color="inherit"></IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
