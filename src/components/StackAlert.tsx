import { IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";

import { RootState } from "../redux/store";
import { removeAlert } from "../redux/slices/stackAlert.slice";

export default function StackAlert() {
  const alerts = useSelector((state: RootState) => state.stackAlert.listAlert);
  const dispatch = useAppDispatch();
  const handleClose = (id: string) => {
    dispatch(removeAlert(id));
  };
  return alerts.length > 0 ? (
    <Stack sx={{ width: "30%" }} spacing={2} position="fixed" top={16} right={16}>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
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
        >
          <AlertTitle sx={{ fontWeight: "bold" }} textTransform="capitalize">
            {alert.severity}
          </AlertTitle>
          {alert.message}
        </Alert>
      ))}
    </Stack>
  ) : null;
}
