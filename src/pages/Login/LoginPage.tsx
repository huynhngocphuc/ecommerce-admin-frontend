import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useAuth } from '../auth/AuthContext';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/auth.slice";
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

  const validate = () => {
    if (!email.trim()) {
      return "Enter your email address.";
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isEmailValid) {
      return "Enter a valid email address.";
    }

    if (!password) {
      return "Enter your password.";
    }

    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await dispatch(login({ email: email.trim(), password })).unwrap();
      navigate("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', py: { xs: 2, md: 4 } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.05fr' }, gap: { xs: 2, md: 3 }, width: '100%' }}>
        <Paper
          sx={{
            p: { xs: 3, md: 4.5 },
            borderRadius: 2,
            minHeight: { xs: 'auto', md: 560 },
          }}
        >
          <Stack spacing={3} sx={{ height: '100%' }}>
            <Box>
              <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.22em' }}>
                admin access
              </Typography>
              <Typography variant="h3" component="h1" sx={{ mt: 1, maxWidth: 540 }}>
                {AUTH_TEXTS.LOGIN_TITLE}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 520 }}>
                Sign in to review catalog changes, handle product updates, and keep the store moving.
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gap: 1.5, maxWidth: 420 }}>
              {[
                'Quick access to product edits and inventory review',
                'Language controls and alerts are already wired in',
                'Keep the workspace open on desktop or mobile',
              ].map((item) => (
                <Paper
                  key={item}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'background.default',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                </Paper>
              ))}
            </Box>

            <Box sx={{ mt: 'auto' }}>
              <Typography variant="caption" color="text.secondary">
                Protected workspace for the operations team.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
          <Box component="form" onSubmit={onSubmit} noValidate>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Welcome back
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Use your admin account to continue.
                </Typography>
              </Box>

              {error && (
                <Alert severity="error">
                  {error}
                </Alert>
              )}

              <Stack spacing={2}>
                <TextField
                  label={AUTH_TEXTS.EMAIL_LABEL}
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />

                <TextField
                  label={AUTH_TEXTS.PASSWORD_LABEL}
                  type={showPw ? "text" : "password"}
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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
              </Stack>

              <Box>
                <FormControlLabel
                  control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
                  label={AUTH_TEXTS.REMEMBER_ME}
                />
                <FormHelperText sx={{ ml: 4.5, mt: 0.5 }}>
                  We’ll keep the session active on this device.
                </FormHelperText>
              </Box>

              <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ py: 1.4 }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : AUTH_TEXTS.LOGIN_BUTTON}
              </Button>

              <Divider />

              <Typography variant="caption" color="text.secondary">
                Need access? Ask an account owner to invite you.
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
