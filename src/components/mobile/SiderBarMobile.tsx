import { Collapse, List, ListItem, ListItemButton, ListItemIcon, Tooltip } from "@mui/material";
import React from "react";
import { MenuItem } from "../Sidebar";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
  return (
    <List sx={{ flexGrow: 1 }}>
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
              >
                <ListItemIcon sx={{ minWidth: "20px" }}>{item.icon}</ListItemIcon>
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
                      >
                        <ListItemIcon sx={{ minWidth: 0 }}>{child.icon}</ListItemIcon>
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
