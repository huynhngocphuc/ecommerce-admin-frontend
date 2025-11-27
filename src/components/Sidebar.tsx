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

const drawerWidth = 280;
const miniDrawerWidth = 80;

export interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  children?: MenuItem[];
}

interface SiderMenuMobileProps {
  menuItems: MenuItem[];
  openSubmenu?: string | null;
  handleSubmenuToggle: (text: string) => void;
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
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{ p: 2, position: "sticky", top: 0, backgroundColor: "background.paper", zIndex: 1 }}
      >
        {drawerOpen ? (
          <Typography variant="h6">Admin Panel</Typography>
        ) : (
          <Typography variant="h6">Admin</Typography>
        )}
      </Box>
      <Divider />
      {drawerOpen ? (
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.children) {
                      handleSubmenuToggle?.(item.text);
                    } else {
                      console.log(`Navigate to ${item.path}`);
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.children && (openSubmenu === item.text ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>

              {item.children && (
                <Collapse in={openSubmenu === item.text} unmountOnExit>
                  <List disablePadding>
                    {item.children.map((child) => (
                      <ListItem key={child.text} disablePadding sx={{ pl: 2 }}>
                        <ListItemButton>
                          <ListItemIcon>{child.icon}</ListItemIcon>
                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <SiderBarMobile
          menuItems={menuItems}
          handleSubmenuToggle={handleSubmenuToggle}
          openSubmenu={openSubmenu}
        />
      )}
      <Divider />
      <Box sx={{ p: 2, position: "sticky", bottom: 0 , backgroundColor: "background.paper", zIndex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", }}>
          <IconButton onClick={handleDrawerToggle} sx={{}}>
            {drawerOpen ? <ArrowCircleLeftOutlined /> : <ArrowCircleRightOutlined />}
          </IconButton>
          {drawerOpen && <Typography variant="body1">Collapse</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

const SiderBarMobile: React.FC<SiderMenuMobileProps> = ({
  menuItems,
  handleSubmenuToggle,
  openSubmenu,
}) => {
  return (
    <List sx={{ flexGrow: 1 }}>
      {menuItems.map((item) => (
        <React.Fragment key={item.text}>
          <ListItem key={item.text} disablePadding sx={{ py: "4px" }}>
            <ListItemButton
              onClick={() => {
                if (item.children) {
                  handleSubmenuToggle(item.text);
                } else {
                  console.log(`Navigate to ${item.path}`);
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: "20px" }}>{item.icon}</ListItemIcon>
              {item.children && (openSubmenu === item.text ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>

          {item.children && (
            <Collapse in={openSubmenu === item.text} unmountOnExit>
              <List disablePadding>
                {item.children.map((child) => (
                  <ListItem key={child.text} disablePadding sx={{ pl: 2, py: "4px" }}>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth:0 }}>{child.icon}</ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default Sidebar;
