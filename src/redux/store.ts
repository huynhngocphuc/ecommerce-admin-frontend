import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './slices/auth.slice';
import loadingReducer from './slices/loading.slice';
import stackAlertReducer from './slices/stackAlert.slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		loading: loadingReducer,
		stackAlert: stackAlertReducer,
		// user: userReducer,
		// products: productReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };

// Typed hook helper (optional): import { useAppDispatch } from './store'
export const useAppDispatch: () => AppDispatch = useDispatch as any;
