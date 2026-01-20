import { IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { useEffect, useState } from "react";

import { RootState } from "../redux/store";
import { removeAlert } from "../redux/slices/stackAlert.slice";

export default function StackAlert() {
  const alerts = useSelector((state: RootState) => state.stackAlert.listAlert);
  const dispatch = useAppDispatch();
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  
  const handleClose = (id: string) => {
    setRemovingIds(prev => new Set(prev).add(id));
  };

  const handleExited = (id: string) => {
    dispatch(removeAlert(id));
    setRemovingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    alerts.forEach((alert) => {
      if (alert.autoHidden && !removingIds.has(alert.id)) {
        const timer = setTimeout(() => {
          setRemovingIds(prev => new Set(prev).add(alert.id));
        }, 1000);
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [alerts, removingIds]);

  return alerts.length > 0 ? (
    <Stack sx={{ width: "30%" }} spacing={2} position="fixed" top={16} right={16} zIndex={9999}>
      {alerts.map((alert) => (
        <Slide 
          key={alert.id} 
          direction="left" 
          in={!removingIds.has(alert.id)} 
          timeout={500}
          onExited={() => handleExited(alert.id)}
        >
          <Alert
            severity={alert.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  handleClose(alert.id);
                }}
              >
                {" "}
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <AlertTitle sx={{ fontWeight: "bold" }} textTransform="capitalize">
              {alert.severity}
            </AlertTitle>
            {alert.message}
          </Alert>
        </Slide>
      ))}
    </Stack>
  ) : null;
}
