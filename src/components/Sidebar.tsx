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

const SidebarContainer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 250,
    borderRadius: "12px",
    backgroundColor: "#F8FAFD",
    padding: theme.spacing(2),
    border: "none",
    margin: "50px", // thêm khoảng cách lề trái và phải
    height: "90%",
  },
}));

const Sidebar = () => {
  return (
    <SidebarContainer variant="permanent">
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Logo + Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, flexShrink: 0 }}>
          <Avatar src="https://img.icons8.com/fluency/48/rocket.png" />
          <Typography variant="h6" fontWeight="bold">
            Spike Admin
          </Typography>
        </Box>

        {/* Menu */}
        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Typography variant="caption" color="GrayText" sx={{ ml: 2, mb: 1 }}>
            HOME
          </Typography>

          <ListItemButton sx={{ bgcolor: "#E3F2FD", borderRadius: 2, mb: 1 }}>
            <ListItemIcon>
              <DashboardRoundedIcon sx={{ color: "#1976D2" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard 1" sx={{ color: "#1976D2" }} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <GridViewRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard 2" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Frontend Pages" />
          </ListItemButton>
          <ListItemButton sx={{ bgcolor: "#E3F2FD", borderRadius: 2, mb: 1 }}>
            <ListItemIcon>
              <DashboardRoundedIcon sx={{ color: "#1976D2" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard 1" sx={{ color: "#1976D2" }} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <GridViewRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard 2" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Frontend Pages" />
          </ListItemButton>
          <ListItemButton sx={{ bgcolor: "#E3F2FD", borderRadius: 2, mb: 1 }}>
            <ListItemIcon>
              <DashboardRoundedIcon sx={{ color: "#1976D2" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard 1" sx={{ color: "#1976D2" }} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <GridViewRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard 2" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Frontend Pages" />
          </ListItemButton>
          <ListItemButton sx={{ bgcolor: "#E3F2FD", borderRadius: 2, mb: 1 }}>
            <ListItemIcon>
              <DashboardRoundedIcon sx={{ color: "#1976D2" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard 1" sx={{ color: "#1976D2" }} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <GridViewRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard 2" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Frontend Pages" />
          </ListItemButton>
          <ListItemButton sx={{ bgcolor: "#E3F2FD", borderRadius: 2, mb: 1 }}>
            <ListItemIcon>
              <DashboardRoundedIcon sx={{ color: "#1976D2" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard 1" sx={{ color: "#1976D2" }} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <GridViewRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard 2" />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Frontend Pages" />
          </ListItemButton>

          <Typography variant="caption" color="GrayText" sx={{ ml: 2, mt: 2, mb: 1 }}>
            APPS
          </Typography>

          <ListItemButton>
            <ListItemIcon>
              <PhoneRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
            <Badge
              badgeContent={2}
              color="secondary"
              sx={{ mr: 2, "& .MuiBadge-badge": { fontSize: "0.75rem", minWidth: "20px", height: "20px" } }}
            />
          </ListItemButton>
        </List>

        {/* Profile */}
        <Box
          sx={{
            backgroundColor: "#E3F2FD",
            padding: 2,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexShrink: 0,
          }}
        >
          <Avatar src="https://i.pravatar.cc/40" />
          <Box>
            <Typography fontWeight="bold">Mike</Typography>
            <Typography variant="body2" color="GrayText">
              Admin
            </Typography>
          </Box>
          <LogoutRoundedIcon sx={{ color: "#1976D2", cursor: "pointer" }} />
        </Box>
      </Box>
    </SidebarContainer>
  );
};

export default Sidebar;
