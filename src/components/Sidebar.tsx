import React, { useState } from 'react';
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
} from '@mui/material';
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
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;
const miniDrawerWidth = 80;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    icon: <Dashboard />,
    path: '/',
  },
  {
    text: 'Sản phẩm',
    icon: <Inventory />,
    path: '/products',
    children: [
      { text: 'Danh sách sản phẩm', icon: <Inventory />, path: '/products' },
      { text: 'Danh mục', icon: <Category />, path: '/categories' },
    ],
  },
  {
    text: 'Đơn hàng',
    icon: <ShoppingCart />,
    path: '/orders',
  },
  {
    text: 'Khách hàng',
    icon: <People />,
    path: '/customers',
  },
  {
    text: 'Khuyến mãi',
    icon: <LocalOffer />,
    path: '/promotions',
  },
  {
    text: 'Đánh giá',
    icon: <Reviews />,
    path: '/reviews',
  },
  {
    text: 'Báo cáo',
    icon: <Assessment />,
    path: '/reports',
  },
  {
    text: 'Cài đặt',
    icon: <Settings />,
    path: '/settings',
  },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [open, setOpen] = useState(!isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setOpen(!open);
    }
  };

  const handleItemClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleExpandClick = (text: string) => {
    setExpandedItems(prev => 
      prev.includes(text) 
        ? prev.filter(item => item !== text)
        : [...prev, text]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.text);
    const active = isActive(item.path);

    return (
      <Box key={item.text}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              if (hasChildren) {
                handleExpandClick(item.text);
              } else {
                handleItemClick(item.path);
              }
            }}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              pl: level > 0 ? 4 : 2.5,
              backgroundColor: active ? theme.palette.primary.main : 'transparent',
              color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
              '&:hover': {
                backgroundColor: active 
                  ? theme.palette.primary.dark 
                  : theme.palette.action.hover,
              },
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
                color: active ? theme.palette.primary.contrastText : theme.palette.text.primary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                opacity: open ? 1 : 0,
                display: open ? 'block' : 'none',
              }} 
            />
            {hasChildren && open && (
              isExpanded ? <ExpandLess /> : <ExpandMore />
            )}
          </ListItemButton>
        </ListItem>
        
        {hasChildren && (
          <Collapse in={isExpanded && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo & Toggle Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 2,
          minHeight: 74,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Avatar
            sx={{
              width: open ? 40 : 32,
              height: open ? 40 : 32,
              bgcolor: theme.palette.primary.main,
              mr: open ? 2 : 0,
            }}
          >
            <Dashboard />
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              display: open ? 'block' : 'none',
              color: theme.palette.primary.main,
              whiteSpace: 'nowrap',
            }}
          >
            E-Commerce Admin
          </Typography>
        </Box>
        
        {/* Desktop Toggle Button - đặt trong header */}
        {!isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            size="small"
            sx={{
              bgcolor: theme.palette.grey[100],
              '&:hover': {
                bgcolor: theme.palette.grey[200],
              },
              transition: 'all 0.2s ease-in-out',
              display: open ? 'flex' : 'none', // Chỉ hiện khi sidebar mở
            }}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
        {menuItems.map(item => renderMenuItem(item))}
      </List>

      <Divider />

      {/* Logout */}
      <Box sx={{ p: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              // Handle logout
              console.log('Logout');
            }}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: theme.palette.error.light,
                color: theme.palette.error.contrastText,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Logout />
            </ListItemIcon>
            <ListItemText 
              primary="Đăng xuất" 
              sx={{ 
                opacity: open ? 1 : 0,
                display: open ? 'block' : 'none',
              }} 
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box>
      
      {isMobile && (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
        position: 'fixed',
        top: 20,
        left: 20,
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        '&:hover': {
          backgroundColor: theme.palette.grey[100],
        },
        }}
      >
        <MenuIcon />
      </IconButton>
      )}

      {/* Desktop Mini Toggle Button - hiện khi sidebar đóng */}
      {!isMobile && !open && (
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
        position: 'fixed',
        top: '50%',
        left: miniDrawerWidth + 10,
        transform: 'translateY(-50%)',
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[4],
        width: 32,
        height: 32,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          transform: 'translateY(-50%) scale(1.1)',
        },
        transition: 'all 0.2s ease-in-out',
        }}
      >
        <ChevronRight sx={{ fontSize: 18 }} />
      </IconButton>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
        keepMounted: true,
        }}
        sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          border: 'none',
          borderRadius: '0 20px 20px 0',
        },
        }}
      >
        {drawerContent}
      </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
      <Drawer
        variant="permanent"
        open={open}
        sx={{
        width: open ? drawerWidth : miniDrawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : miniDrawerWidth,
          transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          border: 'none',
          borderRadius: '20px',
          margin: '20px',
          height: 'calc(100% - 40px)',
          boxShadow: theme.shadows[3],
        },
        }}
      >
        {drawerContent}
      </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;