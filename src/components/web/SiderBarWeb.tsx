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
  return (
    <List sx={{ flexGrow: 1, overflow: "auto" }}>
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
  );
};

export default SiderBarWeb;
