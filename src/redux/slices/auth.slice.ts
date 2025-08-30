
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Role} from '../../features/auth/type';
type AuthState = {
  isAuthenticated: boolean;
  userRoles: Role[];
};

const initialState: AuthState = {
  isAuthenticated: false,
  userRoles: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ roles: Role[] }>) => {
      state.isAuthenticated = true;
      state.userRoles = action.payload.roles;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRoles = [];
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
