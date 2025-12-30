import React, { useState } from "react";
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

const menuItems: MenuItem[] = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: PATHS.HOME,
  },
  {
    text: "Sản phẩm",
    icon: <Inventory />,
    path: PATHS.PRODUCTS,
    children: [
      { text: "Danh sách sản phẩm", icon: <FormatListNumberedIcon />, path: PATHS.PRODUCTS },
      { text: "Danh mục", icon: <Category />, path: PATHS.CATEGORIES },
    ],
  },
  {
    text: "Đơn hàng",
    icon: <ShoppingCart />,
    path: PATHS.ORDERS,
  },
  {
    text: "Khách hàng",
    icon: <People />,
    path: PATHS.CUSTOMERS,
  },
  {
    text: "Khuyến mãi",
    icon: <LocalOffer />,
    path: PATHS.PROMOTIONS,
  },
  {
    text: "Đánh giá",
    icon: <Reviews />,
    path: PATHS.REVIEWS,
  },
  {
    text: "Báo cáo",
    icon: <Assessment />,
    path: PATHS.REPORTS,
  },
  {
    text: "Cài đặt",
    icon: <Settings />,
    path: PATHS.SETTINGS,
  },
];

interface SidebarProps {
  drawerOpen: boolean;
  handleDrawerToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
          {drawerOpen ? <Typography variant="h6">Admin Panel</Typography> : null}
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
            <ArrowCircleLeftOutlined fontSize="large" />
          ) : drawerOpen ? (
            <ArrowCircleLeftOutlined fontSize="large" />
          ) : (
            <ArrowCircleRightOutlined fontSize="large" />
          )}
          <Typography variant="body1" sx={{ ml: 1 }}>
            {isMobile ? "Close" : drawerOpen ? "Collapse" : ""}
          </Typography>
        </ButtonBase>
      </Box>
    </Box>
  );
};

export default Sidebar;
