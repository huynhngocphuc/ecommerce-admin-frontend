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
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";

import NotificationImportantOutlinedIcon from "@mui/icons-material/NotificationImportantOutlined";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAppDispatch } from "../redux/store";
import { logout } from "../redux/slices/auth.slice";
interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const { t } = useTranslation("common");
  const tr = t as unknown as (key: string) => string;
  const dispatch = useAppDispatch();
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const handleProfileToggle = () => {
    setShowProfile((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

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
          borderRadius: { xs: 0, md: "12px" },
          color: theme.palette.text.primary,
          minHeight: { xs: "64px", md: "72px" },
          justifyContent: "center",
          top: 0,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: "64px", md: "72px" }, px: { xs: 1.5, md: 2.5 } }}>
          <IconButton onClick={onMenuClick} sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            sx={{ flexGrow: 1, justifyContent: "flex-end", alignItems: "center", gap: 1 }}
          >
            <IconButton color="inherit" className="btn-rounded-circle-40" sx={{ backgroundColor: "transparent", border: '1px solid', borderColor: 'divider' }}>
              <Badge badgeContent={3} color="info">
                <NotificationImportantOutlinedIcon sx={{ fontSize: "20px" }} />
              </Badge>
            </IconButton>
            <Box sx={{ px: { xs: 0, md: 0.5 } }}>
              <LanguageSwitcher />
            </Box>
            <Box sx={{ position: "relative" }} ref={profileRef}>
              <Button
                onClick={handleProfileToggle}
                sx={{
                  px: 1.25,
                  py: 0.75,
                  minWidth: { xs: "auto", sm: 220 },
                  justifyContent: "flex-start",
                  gap: 1.25,
                  textAlign: "left",
                  backgroundColor: "transparent",
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Avatar alt="Peter Nguyen" src="/images/logo_black.png" sx={{ width: 40, height: 40 }} />
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography variant="body1" sx={{ textTransform: "none", lineHeight: 1.2, fontWeight: 600 }}>
                    Peter Nguyen
                  </Typography>
                  <Typography variant="caption" sx={{ display: "block", color: "text.secondary", textTransform: "none" }}>
                    {tr("admin_role")}
                  </Typography>
                </Box>
              </Button>
              {showProfile && (
                <Box
                  sx={{
                    position: "absolute",
                    backgroundColor: "background.paper",
                    top: "64px",
                    right: 0,
                    minWidth: "200px",
                    boxShadow: "none",
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    p: 2,
                    zIndex: 1000,
                  }}
                >
                  <Typography sx={{ textTransform: "none" }}>{tr("user_profile")}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar alt="Peter Nguyen" src="/images/logo_black.png" />
                    <Box>
                      <Typography variant="body1" fontSize="1rem" sx={{ textTransform: "none" }}>
                        Peter Nguyen
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: "12px", textTransform: "none" }}>
                        {tr("admin_role")}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Button fullWidth onClick={handleLogout} sx={{ textTransform: "none" }}>
                    {tr("logout")}
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
