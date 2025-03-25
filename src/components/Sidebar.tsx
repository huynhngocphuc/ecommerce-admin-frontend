import React from "react";
import { Drawer, Box } from "@mui/material";

const Sidebar = () => {
  return (
    <Drawer variant="persistent" open={true}>
      <Box className="sidebarBox">
        <Box className="logo">
          <a className="logo_link" href="/">
            <img className="logo_img" src="images/logo_black.png" alt="logo" />
            <h1 className="logo_text">GirlHaf</h1>
          </a>
        </Box>
        <Box className="sidebarMenu">
          
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
