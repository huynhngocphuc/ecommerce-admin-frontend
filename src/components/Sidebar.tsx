import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
  ButtonBase,
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  ShoppingCart,
  People,
  Assessment,
  Settings,
  Category,
  LocalOffer,
  Reviews,
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
} from "@mui/icons-material";
import SiderBarMobile from "../components/mobile/SiderBarMobile";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SiderBarWeb from "./web/SiderBarWeb";
import { useNavigate } from "react-router-dom";
import { PATHS } from ".././constants/pathRouter";
export interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  drawerOpen: boolean;
  handleDrawerToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation("admin");
  const tr = t as unknown as (key: string) => string;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const menuItems: MenuItem[] = [
    {
      text: tr("menu.dashboard"),
      icon: <Dashboard color="primary" />,
      path: PATHS.HOME,
    },
    {
      text: tr("menu.products"),
      icon: <Inventory color="primary" />,
      path: PATHS.PRODUCTS,
      children: [
        {
          text: tr("menu.product_list"),
          icon: <FormatListNumberedIcon color="primary" />,
          path: PATHS.PRODUCTS,
        },
        { text: tr("menu.categories"), icon: <Category color="primary" />, path: PATHS.CATEGORIES },
      ],
    },
    {
      text: tr("menu.orders"),
      icon: <ShoppingCart color="primary" />,
      path: PATHS.ORDERS,
    },
    {
      text: tr("menu.customers"),
      icon: <People color="primary" />,
      path: PATHS.CUSTOMERS,
    },
    {
      text: tr("menu.promotions"),
      icon: <LocalOffer color="primary" />,
      path: PATHS.PROMOTIONS,
    },
    {
      text: tr("menu.reviews"),
      icon: <Reviews color="primary" />,
      path: PATHS.REVIEWS,
    },
    {
      text: tr("menu.reports"),
      icon: <Assessment color="primary" />,
      path: PATHS.REPORTS,
    },
    {
      text: tr("menu.settings"),
      icon: <Settings color="primary" />,
      path: PATHS.SETTINGS,
    },
  ];
  const handleSubmenuToggle = (text: string) => {
    setOpenSubmenu(openSubmenu === text ? null : text);
  };
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{ p: 2, position: "sticky", top: 0, backgroundColor: "background.paper", zIndex: 1 }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}
          onClick={() => {
            navigate(PATHS.HOME);
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "transparent",
            }}
          >
            <img
              src="/images/logo_black.png"
              alt="Logo"
              style={{ width: "100%", height: "100%" }}
            />
          </Avatar>
          {drawerOpen ? <Typography variant="h6">{tr("sidebar_title")}</Typography> : null}
        </Box>
      </Box>
      <Divider />
      {isMobile ? (
        <SiderBarWeb
          menuItems={menuItems}
          handleSubmenuToggle={handleSubmenuToggle}
          openSubmenu={openSubmenu}
        />
      ) : drawerOpen ? (
        <SiderBarWeb
          menuItems={menuItems}
          handleSubmenuToggle={handleSubmenuToggle}
          openSubmenu={openSubmenu}
        />
      ) : (
        <SiderBarMobile
          menuItems={menuItems}
          handleSubmenuToggle={handleSubmenuToggle}
          openSubmenu={openSubmenu}
        />
      )}
      <Divider />
      <Box
        sx={{ p: 2, position: "sticky", bottom: 0, backgroundColor: "background.paper", zIndex: 1 }}
      >
        <ButtonBase
          sx={{
            display: "flex",
            width: "100%",
            height: "48px",
            justifyContent: "start",
            borderRadius: 1,
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
          onClick={handleDrawerToggle}
        >
          {isMobile ? (
            <ArrowCircleLeftOutlined fontSize="large" color="primary" />
          ) : drawerOpen ? (
            <ArrowCircleLeftOutlined fontSize="large" color="primary" />
          ) : (
            <ArrowCircleRightOutlined fontSize="large" color="primary" />
          )}
          <Typography variant="body1" sx={{ ml: 1 }}>
            {isMobile ? tr("drawer.close") : drawerOpen ? tr("drawer.collapse") : ""}
          </Typography>
        </ButtonBase>
      </Box>
    </Box>
  );
};

export default Sidebar;
