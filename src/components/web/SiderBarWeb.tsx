import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { MenuItem } from "../Sidebar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

interface SiderMenuWebProps {
  menuItems: MenuItem[];
  openSubmenu?: string | null;
  handleSubmenuToggle: (text: string) => void;
}
const SiderBarWeb: React.FC<SiderMenuWebProps> = ({
  menuItems,
  handleSubmenuToggle,
  openSubmenu,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path?: string) => Boolean(path && (location.pathname === path || location.pathname.startsWith(`${path}/`)));

  return (
    <List
      sx={{
        flexGrow: 1,
        overflow: "auto",
         scrollbarGutter: "stable",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
          "&:hover": {
            background: "#666",
            cursor: "pointer",
          },
        },
      }}
    >
      {menuItems.map((item) => (
        <React.Fragment key={item.text}>
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => {
                if (item.children) {
                  handleSubmenuToggle?.(item.text);
                } else {
                  navigate(item.path || "/");
                }
              }}
              selected={isActive(item.path)}
              sx={{
                mx: 1.5,
                my: 0.25,
                borderRadius: 2,
                minHeight: 48,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(41, 71, 102, 0.12)',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(41, 71, 102, 0.16)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.children && (openSubmenu === item.text ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>

          {item.children && (
            <Collapse in={openSubmenu === item.text} unmountOnExit>
              <List disablePadding>
                {item.children.map((child) => (
                  <ListItem
                    key={child.text}
                    disablePadding
                    sx={{ pl: 2 }}
                    onClick={() => navigate(child.path || "/")}
                  >
                    <ListItemButton
                      selected={isActive(child.path)}
                      sx={{
                        ml: 1.5,
                        mr: 1,
                        mb: 0.25,
                        borderRadius: 2,
                        minHeight: 42,
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(183, 121, 56, 0.12)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>{child.icon}</ListItemIcon>
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
  );
};

export default SiderBarWeb;
