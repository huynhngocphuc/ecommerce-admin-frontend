
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../features/auth/type';
import {showLoading, hideLoading, } from './loading.slice';
import { addAlert, clearAlerts } from './stackAlert.slice';
import { http } from '../../utils/http';
import { ENDPOINTS } from '../../constances/endpoint';

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
  async (payload: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      dispatch(clearAlerts());
      const resp = await http.put(ENDPOINTS.LOGIN, payload);
      console.log("🚀 ~ resp:", resp)
      if (!resp.success) {
        dispatch(hideLoading())
        dispatch(addAlert({ message: resp.errors || 'Login failed', severity: 'error' }));
        return rejectWithValue(resp);
      }
      dispatch(hideLoading())
      dispatch(addAlert({ message: resp.message || 'Login successful', severity: 'success' }));
      return resp;
    } catch (err: any) {
        dispatch(hideLoading())
        dispatch(addAlert({ message: err.message || 'Login failed', severity: 'error' }));
        return rejectWithValue(err);
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
      console.log("🚀 ~ action: fulfilled")

      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.userRoles = [];
    });
  }
});


export default authSlice.reducer;
