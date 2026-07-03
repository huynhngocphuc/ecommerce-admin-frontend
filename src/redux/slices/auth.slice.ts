
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Role } from '../../features/auth/type';
import { Permission } from '../../constants/permissions';
import { showLoading, hideLoading, } from './loading.slice';
import { addAlert, clearAlerts } from './stackAlert.slice';
import { http } from '../../utils/http';
import { ENDPOINTS } from '../../constants/endpoint';

type AuthState = {
  isAuthenticated: boolean;
  userRoles: Role[];
  userPermissions: Permission[];
  isInitialized: boolean;
  userId: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userRoles: [],
  userPermissions: [],
  isInitialized: false,
  userId: null,
};

type AuthUserPayload = {
  id?: string;
  email?: string;
  role?: Role | Role[];
  roles?: Role[];
  permissions?: string[];
};

const allowedRoles: Role[] = ['user', 'admin', 'superadmin'];

const normalizeRoles = (user?: AuthUserPayload): Role[] => {
  if (!user) {
    return [];
  }

  const fromRoles = Array.isArray(user.roles) ? user.roles : [];
  const fromRole = Array.isArray(user.role) ? user.role : user.role ? [user.role] : [];

  return Array.from(
    new Set(
      [...fromRoles, ...fromRole].filter((role): role is Role => allowedRoles.includes(role))
    )
  );
};

const normalizePermissions = (user?: AuthUserPayload): Permission[] => {
  const permissions = Array.isArray(user?.permissions) ? user.permissions : [];
  return Array.from(new Set(permissions.filter((permission): permission is Permission => typeof permission === 'string' && permission.trim() !== '')));
};

const extractAuthUser = (payload: any): AuthUserPayload | undefined => {
  return payload?.data?.user ?? payload?.data?.data?.user ?? payload?.user;
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoading());
      dispatch(clearAlerts());
      const resp = await http.post(ENDPOINTS.LOGIN, payload);
      if (!resp.success) {
        dispatch(hideLoading())
        dispatch(addAlert({ message: resp.message || 'Login failed', severity: 'error' }));
        return rejectWithValue(resp);
      }
      dispatch(hideLoading())
      dispatch(addAlert({ message: resp.message || 'Login successful', severity: 'success', autoHidden: true  }));
      return resp;
    } catch (err: any) {
      dispatch(hideLoading())
      dispatch(addAlert({ message: err.message || 'Login failed', severity: 'error' }));
      return rejectWithValue(err);
    }
  }
);

export const verifyAuth = createAsyncThunk('auth/verify', async (
  _, { rejectWithValue, dispatch }
) => {
  try {
    const resp = await http.get(ENDPOINTS.ME);
    if (!resp.success) {
      dispatch(hideLoading());
      return rejectWithValue(resp);
    }
    dispatch(hideLoading());
    return resp;
  } catch (err: any) {
    dispatch(hideLoading());
    dispatch(addAlert({ message: err.message || 'Verification failed', severity: 'error' }));
    return rejectWithValue(err);
  }

});
export const logout = createAsyncThunk('auth/logout', async (
  _, { rejectWithValue, dispatch }
) => {
  try {
    dispatch(showLoading());
    const resp = await http.post(ENDPOINTS.LOGOUT, {});

    if (!resp.success) {
      dispatch(hideLoading());
      dispatch(addAlert({ message: resp.message || 'Logout failed', severity: 'error' }));
      return rejectWithValue(resp);
    }

    dispatch(hideLoading());
    dispatch(addAlert({ message: resp.message || 'Logout successful', severity: 'success' }));
    return resp;
  } catch (err: any) {
    dispatch(hideLoading());
    dispatch(addAlert({ message: err.message || 'Logout failed', severity: 'error' }));
    return rejectWithValue(err);
  }
});
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.userId = extractAuthUser(action.payload)?.id || null;
      state.userRoles = normalizeRoles(extractAuthUser(action.payload));
      state.userPermissions = normalizePermissions(extractAuthUser(action.payload));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.userRoles = [];
      state.userPermissions = [];
      state.userId = null;
      state.isInitialized = true;
    });
    builder.addCase(verifyAuth.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.userId = extractAuthUser(action.payload)?.id || null;
      state.userRoles = normalizeRoles(extractAuthUser(action.payload));
      state.userPermissions = normalizePermissions(extractAuthUser(action.payload));
    });
    builder.addCase(verifyAuth.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.userRoles = [];
      state.userPermissions = [];
      state.userId = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.userRoles = [];
      state.userPermissions = [];
      state.isInitialized = true;
      state.userId = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isAuthenticated = false;
      state.userRoles = [];
      state.userPermissions = [];
      state.userId = null;
    });
  }
});


export default authSlice.reducer;
