import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useAuth } from '../auth/AuthContext';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { login, login as loginAction } from "../../redux/slices/auth.slice";
import { AUTH_TEXTS } from "../../constants";

const LoginPage: React.FC = () => {
  //   const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     const resp = await dispatch(login({ email, password }));
     console.log("🚀 ~ onSubmit ~ resp:", resp)
     if (resp.type === 'auth/login/fulfilled') {
        navigate("/");
     }
    } catch (e) {
      console.log(e);
    }

  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {AUTH_TEXTS.LOGIN_TITLE}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label={AUTH_TEXTS.EMAIL_LABEL}
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label={AUTH_TEXTS.PASSWORD_LABEL}
          type={showPw ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password"
                    onClick={() => setShowPw((s) => !s)}
                    edge="end"
                  >
                    {showPw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControlLabel
          control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
          label={AUTH_TEXTS.REMEMBER_ME}
          sx={{ mt: 1 }}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : AUTH_TEXTS.LOGIN_BUTTON}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
