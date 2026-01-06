import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useTheme
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import { useAppDispatch } from "../redux/store";
import { logout } from "../redux/slices/auth.slice";
interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const handleProfileToggle = () => {
    setShowProfile((prev) => !prev);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };
  const handleLogout = () => {
    dispatch(logout());
    console.log("Đăng xuất");
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "10px",
          color: theme.palette.text.primary,
          minHeight: "70px",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <IconButton onClick={onMenuClick} sx={{ display: { xs: "flex", md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            sx={{ flexGrow: 1, justifyContent: "flex-end", alignItems: "center" }}
            spacing={1}
          >
            <Box>
              <IconButton color="inherit" className="btn-rounded-circle-40">
                <Badge badgeContent={3} color="info">
                  <NotificationImportantOutlinedIcon sx={{ fontSize: "20px" }} />
                </Badge>
              </IconButton>
            </Box>
            {/* Thêm ref vào Box container */}
            <Box sx={{ position: "relative" }} ref={profileRef}>
              <Button sx={{ borderRadius: "20px", minWidth: "64px" }} onClick={handleProfileToggle}>
                <Avatar alt="Sharp" src="images/logo_black.png" />
                <Box sx={{ marginLeft: "16px" }}>
                  <Typography variant="body1" fontSize="1.2rem" sx={{ textTransform: "none" }}>
                    Peter
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "14px", textTransform: "none" }}>
                    admin
                  </Typography>
                </Box>
              </Button>

              {showProfile && (
                <Box
                  sx={{
                    position: "absolute",
                    backgroundColor: "background.paper",
                    top: "60px",
                    right: 0,
                    minWidth: "200px",
                    boxShadow: 3,
                    borderRadius: 2,
                    p: 2,
                    zIndex: 1000,
                  }}
                >
                  <Typography sx={{ textTransform: "none" }}>User Profile</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar alt="Sharp" src="images/logo_black.png" />
                    <Box>
                      <Typography variant="body1" fontSize="1rem" sx={{ textTransform: "none" }}>
                        Peter
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "12px", textTransform: "none" }}>
                        admin
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Button fullWidth onClick={handleLogout} sx={{ textTransform: "none" }}>
                    Logout
                  </Button>
                </Box>
              )}
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
