import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
// Import các slice reducer ở đây nếu có
// import userReducer from '../features/auth/us1erSlice';
// import productReducer from '../features/products/productSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		// user: userReducer,
		// products: productReducer,
	},
	// middleware, devTools, ... có thể thêm ở đây
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
