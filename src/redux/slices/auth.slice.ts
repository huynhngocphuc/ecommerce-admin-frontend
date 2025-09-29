
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
      
      console.log("🚀 ~ login:", payload)

      const resp = await fetch('http://localhost:4000/auth/login', {
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
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("🚀 ~ action:", action)

      state.isAuthenticated = true;
      state.userRoles = action.payload.user.roles;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("🚀 ~ action:", action)
      state.isAuthenticated = false;
      state.userRoles = [];
    });
  }
});


export default authSlice.reducer;
