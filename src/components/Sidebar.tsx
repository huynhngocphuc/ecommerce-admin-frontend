import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
  Collapse,
  ButtonBase,
  Slide,
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  ShoppingCart,
  People,
  Assessment,
  Settings,
  Logout,
  Menu as MenuIcon,
  ChevronLeft,
  ExpandLess,
  ExpandMore,
  Category,
  LocalOffer,
  Reviews,
  ChevronRight,
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import SiderBarMobile from "../components/mobile/SiderBarMobile";
import SiderBarWeb from "./web/SiderBarWeb";

const drawerWidth = 280;
const miniDrawerWidth = 80;

export interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },
  {
    text: "Sản phẩm",
    icon: <Inventory />,
    path: "/products",
    children: [
      { text: "Danh sách sản phẩm", icon: <Inventory />, path: "/products" },
      { text: "Danh mục", icon: <Category />, path: "/categories" },
    ],
  },
  {
    text: "Đơn hàng",
    icon: <ShoppingCart />,
    path: "/orders",
  },
  {
    text: "Khách hàng",
    icon: <People />,
    path: "/customers",
  },
  {
    text: "Khuyến mãi",
    icon: <LocalOffer />,
    path: "/promotions",
  },
  {
    text: "Đánh giá",
    icon: <Reviews />,
    path: "/reviews",
  },
  {
    text: "Báo cáo",
    icon: <Assessment />,
    path: "/reports",
  },
  {
    text: "Cài đặt",
    icon: <Settings />,
    path: "/settings",
  },
];

interface SidebarProps {
  drawerOpen: boolean;
  handleDrawerToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerOpen, handleDrawerToggle }) => {
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
          {drawerOpen ? <Typography variant="h6">Admin Panel</Typography> : null}
        </Box>
      </Box>
      <Divider />
      {drawerOpen ? (
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
            height: '48px',
            justifyContent: "start",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
          onClick={handleDrawerToggle}
        >
          {drawerOpen ? <ArrowCircleLeftOutlined fontSize='large' /> : <ArrowCircleRightOutlined fontSize='medium' />}

          {drawerOpen && <Typography variant="body1" sx={{ml:1}}>Collapse</Typography>}
        </ButtonBase>
      </Box>
    </Box>
  );
};

export default Sidebar;
