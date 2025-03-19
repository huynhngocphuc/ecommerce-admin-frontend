import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Badge,
  Box,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { styled } from "@mui/material/styles";

const Sidebar = () => {
  return (
    <Drawer variant="persistent" open={true}>
      <Box
        className="sidebarBox"
       
      ></Box>
    </Drawer>
  );
};

export default Sidebar;
