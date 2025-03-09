import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemButton, useMediaQuery } from '@mui/material';

const Sidebar: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const drawerWidth = isMobile ? 240 : 300;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>
        <ListItemButton>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        {/* ...existing code... */}
      </List>
    </Drawer>
  );
};

export default Sidebar;