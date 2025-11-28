import { Collapse, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import React from "react";
import { MenuItem } from "../Sidebar";

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
            </ListItemButton>
          </ListItem>

          {item.children && (
            <Collapse in={openSubmenu === item.text} unmountOnExit>
              <List disablePadding>
                {item.children.map((child) => (
                  <ListItem key={child.text} disablePadding sx={{ pl: 2, py: "4px" }}>
                    <ListItemButton>
                      <ListItemIcon sx={{ minWidth: 0 }}>{child.icon}</ListItemIcon>
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

export default SiderBarMobile;
