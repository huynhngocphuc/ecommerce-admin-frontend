
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../features/auth/type';
type AuthState = {
  isAuthenticated: boolean;
  userRoles: Role[];
};

const initialState: AuthState = {
  isAuthenticated: false,
  userRoles: [],
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    try {
      const resp = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) {
        await resp.json();
      }
      return await resp.json(); // { accessToken, user }
    } catch (err: any) {
      console.log("🚀 ~ err:", err)
      
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {}
});


export default authSlice.reducer;
