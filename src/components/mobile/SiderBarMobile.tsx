import { Collapse, List, ListItem, ListItemButton, ListItemIcon, Tooltip } from "@mui/material";
import React from "react";
import { MenuItem } from "../Sidebar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

interface SiderMenuMobileProps {
  menuItems: MenuItem[];
  openSubmenu?: string | null;
  handleSubmenuToggle: (text: string) => void;
}
const SiderBarMobile: React.FC<SiderMenuMobileProps> = ({
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
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
          "&:hover": {
            background: "#666",
          },
        },
      }}
    >
      {menuItems.map((item) => (
        <React.Fragment key={item.text}>
          <ListItem key={item.text} disablePadding sx={{ py: "4px" }}>
            <Tooltip title={item.text} placement="right">
              <ListItemButton
                onClick={() => {
                  if (item.children) {
                    handleSubmenuToggle(item.text);
                  } else {
                    navigate(item.path || "/");
                  }
                }}
                selected={isActive(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(41, 71, 102, 0.12)',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "20px", color: 'text.secondary' }}>{item.icon}</ListItemIcon>
                {item.children && (openSubmenu === item.text ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </Tooltip>
          </ListItem>

          {item.children && (
            <Collapse in={openSubmenu === item.text} unmountOnExit>
              <List disablePadding>
                {item.children.map((child) => (
                  <ListItem key={child.text} disablePadding sx={{ pl: 2, py: "4px" }}>
                    <Tooltip title={child.text} placement="right">
                      <ListItemButton
                        onClick={() => {
                          navigate(child.path || "/");
                        }}
                        selected={isActive(child.path)}
                        sx={{
                          mx: 1,
                          borderRadius: 2,
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(183, 121, 56, 0.12)',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 0, color: 'text.secondary' }}>{child.icon}</ListItemIcon>
                      </ListItemButton>
                    </Tooltip>
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

export default SiderBarMobile;
