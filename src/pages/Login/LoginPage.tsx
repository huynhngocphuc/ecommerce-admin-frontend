import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { useAuth } from '../auth/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
//   const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, remember }),
      });
      const data = await response.json();
      if (!response.ok) {
      setError(data.message || 'Đăng nhập thất bại');
      } else {
      // Xử lý đăng nhập thành công, ví dụ chuyển trang
      
      navigate('/');
      }
    } catch (err: any) {
      setError('Lỗi kết nối đến máy chủ');
    } finally {
      setLoading(false);
    }
    console.log("🚀 ~ onSubmit ~ e:", e,email, password)

  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Box component="form" onSubmit={onSubmit} noValidate>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Đăng nhập quản trị
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Mật khẩu"
          type={showPw ? 'text' : 'password'}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password" onClick={() => setShowPw((s) => !s)} edge="end">
                    {showPw ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControlLabel
          control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
          label="Nhớ đăng nhập"
          sx={{ mt: 1 }}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;